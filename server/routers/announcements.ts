import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

/**
 * Announcements Management Router
 * Allows admins to manage announcements and activities
 */

const announcementSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["招生", "活動", "公告", "學術"]),
  date: z.date(),
  title: z.string().min(1, "公告標題必填"),
  excerpt: z.string().min(1, "公告摘要必填"),
  content: z.string().optional(),
  status: z.enum(["published", "draft", "archived"]).default("published"),
});

type Announcement = z.infer<typeof announcementSchema>;

// Mock database - in production, use actual database
const announcements: Announcement[] = [
  {
    id: "1",
    type: "招生",
    date: new Date("2025-03-01"),
    title: "114學年度第二學期華語文課程招生公告",
    excerpt: "本中心開放114學年度第二學期（2025年3月至6月）課程報名，歡迎外籍學生踴躍申請。",
    status: "published",
  },
  {
    id: "2",
    type: "活動",
    date: new Date("2025-02-20"),
    title: "2025年台灣文化體驗活動報名開始",
    excerpt: "春節文化體驗活動，包含包粽子、書法體驗、夜市導覽等精彩活動，名額有限。",
    status: "published",
  },
];

export const announcementsRouter = router({
  // 列出所有公告
  list: protectedProcedure.query(async () => {
    return announcements.filter((a) => a.status === "published");
  }),

  // 取得單個公告
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const announcement = announcements.find((a) => a.id === input.id);
      if (!announcement) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "公告不存在",
        });
      }
      return announcement;
    }),

  // 新增公告（僅管理員）
  create: protectedProcedure
    .input(announcementSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可新增公告",
        });
      }

      const newAnnouncement: Announcement = {
        ...input,
        id: String(announcements.length + 1),
      };
      announcements.push(newAnnouncement);
      return newAnnouncement;
    }),

  // 更新公告（僅管理員）
  update: protectedProcedure
    .input(announcementSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可更新公告",
        });
      }

      const index = announcements.findIndex((a) => a.id === input.id);
      if (index === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "公告不存在",
        });
      }

      announcements[index] = input as Announcement;
      return announcements[index];
    }),

  // 刪除公告（僅管理員）
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可刪除公告",
        });
      }

      const index = announcements.findIndex((a) => a.id === input.id);
      if (index === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "公告不存在",
        });
      }

      announcements.splice(index, 1);
      return { success: true };
    }),
});
