import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getDepartmentAndCourse: publicProcedure.query(async ({ ctx }) => {
    const departments = await ctx.prisma.department.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        Course: true,
      },
    });
    const courses = await ctx.prisma.course.findMany();
    const departmentWithCourse = departments.map((data) => {
      const courseInDep = courses.filter((c) => c.departmentId === data.id);
      return { ...data, courses: courseInDep };
    });
    return departmentWithCourse;
  }),
  createDepartment: publicProcedure
    .input(
      z.object({
        name: z.string(),
        acronym: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.department.create({
        data: {
          ...input,
          acronym: input.acronym.toUpperCase(),
        },
      });
    }),
  editDepartment: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        acronym: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.department.update({
        where: { id: input.id },
        data: {
          ...input,
          acronym: input.acronym.toUpperCase(),
        },
      });
    }),
  deleteDepartment: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.department.delete({
        where: { id: input.id },
      });
    }),
});
