import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const donorRouter = createTRPCRouter({
  getDonorLogin: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const hasAdmin = await ctx.prisma.admin.findFirst({
        where: { username: input.username },
      });
      const loginAsAdmin = await ctx.prisma.admin.findFirst({
        where: {
          AND: [{ username: input.username }, { password: input.password }],
        },
      });
      if (hasAdmin && loginAsAdmin) {
        return {
          hasEmail: hasAdmin,
          login: loginAsAdmin,
          type: "admin",
        };
      }
      const hasEmail = await ctx.prisma.donor.findUnique({
        where: { username: input.username },
      });
      const login = await ctx.prisma.donor.findFirst({
        where: {
          AND: [{ username: input.username }, { password: input.password }],
        },
      });
      return {
        hasEmail,
        login,
        type: "donor",
      };
    }),
  createDonor: publicProcedure
    .input(
      z.object({
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        alumni: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasDonor = await ctx.prisma.donor.findFirst({
        where: {
          username: input.username,
        },
      });
      if (hasDonor) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "This username is already used! Please use another username.",
          // optional: pass the original error to retain stack trace
        });
      } else {
        return ctx.prisma.donor.create({
          data: {
            ...input,
          },
        });
      }
    }),
});
