import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import {
  createNews,
  getNewsById,
  listNews,
  searchNews,
  updateNews,
  deleteNews,
} from "../db";

export const newsRouter = router({
  // 公開：獲取已發布的新聞列表
  listPublished: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      return await listNews({
        status: "published",
        category: input.category,
        limit: input.limit,
        offset: input.offset,
      });
    }),

  // 公開：獲取單篇新聞
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const newsItem = await getNewsById(input.id);
      if (!newsItem) {
        throw new TRPCError({ code: "NOT_FOUND", message: "新聞不存在" });
      }
      // 只返回已發布的新聞
      if (newsItem.status !== "published") {
        throw new TRPCError({ code: "NOT_FOUND", message: "新聞不存在" });
      }
      return newsItem;
    }),

  // 公開：搜尋已發布的新聞
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const results = await searchNews(input.query);
      return results.filter((item) => item.status === "published");
    }),

  // 管理員：列出所有新聞（包括草稿）
  listAll: adminProcedure
    .input(
      z.object({
        status: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      return await listNews({
        status: input.status,
        category: input.category,
        limit: input.limit,
        offset: input.offset,
      });
    }),

  // 管理員：建立新聞
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        category: z.enum(["校園", "課程", "活動", "公告", "其他"]).default("其他"),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published", "archived"]).default("draft"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newsItem = await createNews({
        title: input.title,
        content: input.content,
        excerpt: input.excerpt,
        category: input.category,
        imageUrl: input.imageUrl,
        authorId: ctx.user!.id,
        status: input.status,
        publishedAt: input.status === "published" ? new Date() : null,
      });

      if (!newsItem) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "建立新聞失敗",
        });
      }

      return newsItem;
    }),

  // 管理員：更新新聞
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        category: z.enum(["校園", "課程", "活動", "公告", "其他"]).optional(),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published", "archived"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existing = await getNewsById(input.id);
      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "新聞不存在" });
      }

      const updateData: any = {};
      if (input.title !== undefined) updateData.title = input.title;
      if (input.content !== undefined) updateData.content = input.content;
      if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
      if (input.category !== undefined) updateData.category = input.category;
      if (input.imageUrl !== undefined) updateData.imageUrl = input.imageUrl;
      if (input.status !== undefined) {
        updateData.status = input.status;
        // 如果狀態改為已發布，設定發布時間
        if (input.status === "published" && !existing.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }

      const updated = await updateNews(input.id, updateData);
      if (!updated) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "更新新聞失敗",
        });
      }

      return updated;
    }),

  // 管理員：刪除新聞
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const existing = await getNewsById(input.id);
      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "新聞不存在" });
      }

      const success = await deleteNews(input.id);
      if (!success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "刪除新聞失敗",
        });
      }

      return { success: true };
    }),
});
