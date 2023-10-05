import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/utils/api";

export const adminsRouter = createTRPCRouter({
  findAdmin: publicProcedure.query(({ ctx }) => {
    const donor = ctx.prisma.admin.findFirst();
    return donor;
  }),
  editAdminUsername: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.prisma.admin.findFirst();
      return ctx.prisma.admin.update({
        where: {
          id: admin?.id || "",
        },
        data: {
          ...input,
        },
      });
    }),
  adminChangePass: publicProcedure
    .input(
      z.object({
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.prisma.admin.findFirst();
      return ctx.prisma.admin.update({
        where: {
          id: admin?.id || "",
        },
        data: {
          ...input,
        },
      });
    }),
});
