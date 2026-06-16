import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

/**
 * Course Management Router
 * Allows admins to manage courses, schedules, and activities
 */

// Define course schema
const courseSchema = z.object({
  id: z.string().optional(),
  level: z.string().min(1, "課程等級必填"),
  code: z.string().min(1, "課程代碼必填"),
  title: z.string().min(1, "課程名稱必填"),
  description: z.string().min(1, "課程描述必填"),
  startDate: z.date(),
  endDate: z.date(),
  capacity: z.number().min(1, "課程人數必填"),
  instructor: z.string().min(1, "授課教師必填"),
  schedule: z.string().min(1, "上課時間必填"),
  status: z.enum(["active", "inactive", "completed"]).default("active"),
});

type Course = z.infer<typeof courseSchema>;

// Mock database - in production, use actual database
const courses: Course[] = [
  {
    id: "1",
    level: "初級",
    code: "A1–A2",
    title: "基礎華語課程",
    description: "從零開始學習中文，掌握基本日常會話、拼音系統與基礎漢字書寫。",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-06-30"),
    capacity: 20,
    instructor: "李老師",
    schedule: "週一、三、五 09:00-11:00",
    status: "active",
  },
];

export const coursesRouter = router({
  // 列出所有課程
  list: protectedProcedure.query(async () => {
    return courses;
  }),

  // 取得單個課程
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const course = courses.find((c) => c.id === input.id);
      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "課程不存在",
        });
      }
      return course;
    }),

  // 新增課程（僅管理員）
  create: protectedProcedure
    .input(courseSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可新增課程",
        });
      }

      const newCourse: Course = {
        ...input,
        id: String(courses.length + 1),
      };
      courses.push(newCourse);
      return newCourse;
    }),

  // 更新課程（僅管理員）
  update: protectedProcedure
    .input(courseSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可更新課程",
        });
      }

      const index = courses.findIndex((c) => c.id === input.id);
      if (index === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "課程不存在",
        });
      }

      courses[index] = input as Course;
      return courses[index];
    }),

  // 刪除課程（僅管理員）
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可刪除課程",
        });
      }

      const index = courses.findIndex((c) => c.id === input.id);
      if (index === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "課程不存在",
        });
      }

      courses.splice(index, 1);
      return { success: true };
    }),
});
