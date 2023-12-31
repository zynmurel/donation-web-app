import { departmentRouter } from "~/server/api/routers/department";
import { createTRPCRouter } from "~/server/api/trpc";
import { studentRouter } from "./routers/student";
import { donorRouter } from "./routers/donor";
import { itemsRouter } from "./routers/items";
import { adminsRouter } from "./routers/admin";
import { coursesRouter } from "./routers/courses";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  student: studentRouter,
  department: departmentRouter,
  donor: donorRouter,
  item: itemsRouter,
  admin: adminsRouter,
  courses: coursesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
