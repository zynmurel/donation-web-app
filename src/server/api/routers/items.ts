import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/utils/api";

export const itemsRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(
      z.object({
        description: z.string(),
        type: z.string(),
        imageUrl: z.string(),
        donorId: z.string(),
        itemName: z.string(),
        quantity: z.number(),
        unit: z.string(),
        bulkDonatedTo: z.string().optional(),
        location: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createItem = await ctx.prisma.item.create({
        data: {
          ...input,
          status: "pending",
        },
      });
      return createItem;
    }),
  getItemsByStatus: publicProcedure
    .input(
      z.object({
        status: z.string(),
        donorId: z.string(),
        alsoDonated: z.nullable(z.boolean()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const donated = await ctx.prisma.item.findMany({
        where: {
          AND: [
            { status: "approved" || "confirmed" },
            { donorId: input.donorId },
          ],
        },
      });
      const item = await ctx.prisma.item.findMany({
        where: {
          AND: [{ status: input.status }, { donorId: input.donorId }],
        },
      });
      const some = [...item];
      if (input.alsoDonated) {
        some.push(...donated);
      }
      return some;
    }),

  setItemsStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.item.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),
  deleteItem: publicProcedure
    .input(z.object({ id: z.string(), donorId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.item.delete({
        where: {
          id: input.id,
        },
      });
      return ctx.prisma.item.findMany({
        where: {
          AND: [{ status: "cancelled" }, { donorId: input.donorId }],
        },
      });
    }),
  getAllItems: publicProcedure
    .input(z.object({ donorId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.item.findMany({
        where: {
          donorId: input.donorId,
        },
        orderBy: {
          status: "asc",
        },
      });
    }),
  getItemsByStatusQuery: publicProcedure
    .input(
      z.object({
        status: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const students = ctx.prisma.item.findMany({
        where: {
          status: input.status,
          type: "small",
        },
        include: {
          donor: true,
          student: true,
          ItemToMine: {
            where: {
              OR: [{ status: "claimed" }],
            },
            select: {
              quantity: true,
            },
          },
        },
      });
      return (await students).map((data) => {
        const donatedCount = data.ItemToMine.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.quantity ? currentValue.quantity : 0),
          0,
        );
        return {
          ...data,
          donatedCount,
        };
      });
    }),
  getBulkDonationByStatus: publicProcedure
    .input(
      z.object({
        status: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const students = ctx.prisma.item.findMany({
        where: {
          status: input.status,
          type: "bulk",
        },
        include: {
          donor: true,
          student: true,
        },
      });
      return students;
    }),
  donateBulkDonation: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const students = await ctx.prisma.item.update({
        where: {
          id: input.id,
        },
        data: {
          status: "donated",
        },
      });
      return students;
    }),
  getMinedItems: publicProcedure.query(async ({ ctx }) => {
    const minedItems = await ctx.prisma.item.findMany({
      where: {
        OR: [{ status: "approved" }, { status: "donated" }],
        type: "small",
        quantity: { gt: 0 },
      },
      include: {
        ItemToMine: {
          where: {
            status: null,
          },
          orderBy: {
            updatedAt: "asc",
          },
          include: {
            student: true,
            item: true,
          },
        },
      },
    });
    return minedItems.filter((data) => data.ItemToMine.length);
  }),
  confirmMined: publicProcedure
    .input(
      z.object({
        id: z.string(),
        studentId: z.string(),
        itemToMineId: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.item.findUnique({
        where: {
          id: input.id,
        },
      });
      const data: any = {
        studentId: input.studentId,
        quantity: (item?.quantity || 0) - input.quantity,
      };
      if ((item?.quantity || 0) - input.quantity < 0) {
        data.status = "confirmed";
      }
      return await ctx.prisma.item
        .update({
          where: {
            id: input.id,
          },
          data: data,
        })
        .then(async (data) => {
          if ((data?.quantity || 0) <= 0) {
            await ctx.prisma.itemToMine.updateMany({
              where: {
                itemID: data.id,
                status: null,
              },
              data: {
                status: "denied",
              },
            });
          }
          return data;
        })
        .then(async (data) => {
          await ctx.prisma.itemToMine.update({
            where: {
              id: input.itemToMineId,
            },
            data: {
              status: "confirmed",
            },
          });
          return data;
        });
    }),
  claimMined: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
        studentId: z.string(),
        itemToMineId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.item
        .update({
          where: {
            id: input.itemId,
            quantity: { gte: 0 },
          },
          data: {
            studentId: input.studentId,
            status: "donated",
          },
        })
        .then(() => {
          return ctx.prisma.itemToMine.update({
            where: {
              id: input.itemToMineId,
            },
            data: {
              status: "claimed",
            },
          });
        });
    }),
  getConfirmedItems: publicProcedure.query(async ({ ctx }) => {
    const confirmedItems = await ctx.prisma.itemToMine.findMany({
      where: {
        status: "confirmed",
      },
      include: {
        student: true,
        item: true,
      },
    });
    return confirmedItems;
  }),
  getClaimedItems: publicProcedure.query(async ({ ctx }) => {
    const confirmedItems = await ctx.prisma.itemToMine.findMany({
      where: {
        status: "claimed",
      },
      include: {
        student: true,
        item: true,
      },
    });
    return confirmedItems;
  }),
  getApprovedItems: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const approvedItems = await ctx.prisma.item.findMany({
        where: {
          OR: [{ status: "approved" }, { status: "donated" }],
          type: "small",
          quantity: {
            gt: 0,
          },
          // ItemToMine: {
          //   every: {
          //     student: {
          //       id: {
          //         not: {
          //           equals: input.id,
          //         },
          //       },
          //     },
          //   },
          // },
        },
        include: {
          student: true,
          ItemToMine: {
            include: {
              student: true,
            },
          },
        },
      });
      return approvedItems;
    }),
  mineItem: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        itemID: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const createItemToMine = ctx.prisma.itemToMine.create({
        data: {
          studentId: input.studentId,
          itemID: input.itemID,
          quantity: input.quantity,
        },
      });
      return createItemToMine;
    }),
  minedItemListByStatus: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        status: z.string().nullish(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.itemToMine.findMany({
        where: {
          studentId: input.studentId,
          status: {
            equals: input.status,
          },
        },
        include: {
          item: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  deleteMined: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.itemToMine.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getDonatedBulk: publicProcedure
    .input(
      z.object({
        date: z.date(),
      }),
    )
    .query(({ ctx, input }) => {
      const bulkPerMonth = ctx.prisma.item.findMany({
        where: {
          type: "bulk",
          updatedAt: {
            gte: dayjs(input.date).startOf("month").toDate(),
            lte: dayjs(input.date).endOf("month").toDate(),
          },
        },
        include: {
          donor: true,
        },
      });
      return bulkPerMonth;
    }),
  getSmallDonations: publicProcedure
    .input(
      z.object({
        date: z.date(),
      }),
    )
    .query(({ ctx, input }) => {
      const bulkPerMonth = ctx.prisma.itemToMine.findMany({
        where: {
          status: "claimed",
          updatedAt: {
            gte: dayjs(input.date).startOf("month").toDate(),
            lte: dayjs(input.date).endOf("month").toDate(),
          },
        },
        include: {
          student: true,
          item: {
            include: {
              donor: true,
            },
          },
        },
      });
      return bulkPerMonth;
    }),
  getDonatedItemsByMonth: publicProcedure
    .input(
      z.object({
        date: z.date(),
      }),
    )
    .query(({ ctx, input }) => {
      const donatedPerMonth = ctx.prisma.item.findMany({
        where: {
          OR: [{ status: "donated" }, { status: "confirmed" }],
          updatedAt: {
            gte: dayjs(input.date).startOf("month").toDate(),
            lte: dayjs(input.date).endOf("month").toDate(),
          },
        },
        include: {
          donor: true,
        },
      });
      return donatedPerMonth;
    }),
  getSingleItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const donatedPerMonth = ctx.prisma.item.findUnique({
        where: {
          id: input.id,
        },
        include: {
          donor: true,
          student: true,
          ItemToMine: {
            include: {
              student: true,
              item: true,
            },
          },
        },
      });
      return donatedPerMonth;
    }),
});
