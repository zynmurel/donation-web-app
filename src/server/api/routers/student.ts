import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const studentRouter = createTRPCRouter({
  getStudentLogin: publicProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const hasEmail = await ctx.prisma.student.findUnique({
        where: { studentId: input.id },
      });
      const login = await ctx.prisma.student.findFirst({
        where: {
          AND: [{ studentId: input.id }, { password: input.password }],
        },
      });
      return {
        hasEmail,
        login,
      };
    }),
  createStudent: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        departmentId: z.string(),
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.student.findFirst({
        where: {
          studentId: input.studentId,
        },
      });
      if (hasStudent) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "This student identification has already been used! Please contact the administrator if you believe there is an error.",
        });
      } else {
        return ctx.prisma.student.create({
          data: {
            ...input,
            status: "notapproved",
            password: "Default123",
          },
        });
      }
    }),
  getStudentByStatus: publicProcedure
    .input(
      z.object({
        status: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const students = ctx.prisma.student.findMany({
        where: {
          status: input.status,
        },
        include: {
          course: true,
          department: true,
        },
      });
      return students;
    }),
  changeStudentStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const students = ctx.prisma.student.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
      return students;
    }),
  deleteStudent: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const students = ctx.prisma.student.delete({
        where: {
          id: input.id,
        },
      });
      return students;
    }),
});
