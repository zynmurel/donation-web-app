import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const coursesRouter = createTRPCRouter({
  deleteCourse: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.course.delete({
        where: { id: input.id },
      });
    }),
  createCourse: publicProcedure
    .input(
      z.object({
        name: z.string(),
        departmentId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.course.create({
        data: {
          ...input,
        },
      });
    }),
  editCourse: publicProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.course.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});
