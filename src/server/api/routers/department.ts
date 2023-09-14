import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getDepartmentAndCourse: publicProcedure.query(async ({ ctx }) => {
    const departments = await ctx.prisma.department.findMany();
    const courses = await ctx.prisma.course.findMany();
    const departmentWithCourse = departments.map((data) => {
      const courseInDep = courses.filter((c) => c.departmentId === data.id);
      return { ...data, courses: courseInDep };
    });
    return departmentWithCourse;
  }),
});
