import { TRPCError } from "@trpc/server";
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
          AND: [{ status: "donated" }, { donorId: input.donorId }],
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
    .mutation(({ ctx, input }) => {
      return ctx.prisma.item.update({
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
        },
      });
      return students;
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
        donateTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const students = await ctx.prisma.item.update({
        where: {
          id: input.id,
        },
        data: {
          status: "donated",
          bulkDonatedTo: input.donateTo,
        },
      });
      return students;
    }),
  getMinedItems: publicProcedure.query(async ({ ctx }) => {
    const minedItems = await ctx.prisma.item.findMany({
      where: {
        status: "approved",
        type: "small",
      },
      include: {
        ItemToMine: {
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.item
        .update({
          where: {
            id: input.id,
          },
          data: {
            studentId: input.studentId,
            status: "confirmed",
          },
        })
        .then((data) => {
          return ctx.prisma.itemToMine.updateMany({
            where: {
              itemID: data.id,
            },
            data: {
              status: "denied",
            },
          });
        })
        .then(() => {
          return ctx.prisma.itemToMine.update({
            where: {
              id: input.itemToMineId,
            },
            data: {
              status: "confirmed",
            },
          });
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
  getApprovedItems: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const approvedItems = await ctx.prisma.item.findMany({
        where: {
          status: "approved",
          type: "small",
          quantity: {
            gt: 0,
          },
          ItemToMine: {
            every: {
              student: {
                id: {
                  not: {
                    equals: input.id,
                  },
                },
              },
            },
          },
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
      }),
    )
    .mutation(({ ctx, input }) => {
      const createItemToMine = ctx.prisma.itemToMine.create({
        data: {
          studentId: input.studentId,
          itemID: input.itemID,
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
});
