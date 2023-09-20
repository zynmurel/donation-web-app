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
        item: z.string(),
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
    .input(z.object({ status: z.string(), donorId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.item.findMany({
        where: {
          AND: [{ status: input.status }, { donorId: input.donorId }],
        },
      });
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
});
