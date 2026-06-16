import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { users, type User } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * User Management Router
 * Allows admins to manage user roles and permissions
 */

const userRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});

export const usersRouter = router({
  // 列出所有使用者（僅管理員）
  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "僅管理員可查看使用者列表",
      });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "資料庫連接失敗",
      });
    }

    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (error) {
      console.error("[Database] Failed to list users:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "無法取得使用者列表",
      });
    }
  }),

  // 取得單個使用者（僅管理員）
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可查看使用者資訊",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "資料庫連接失敗",
        });
      }

      try {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, input.id))
          .limit(1);

        if (user.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "使用者不存在",
          });
        }

        return user[0];
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Database] Failed to get user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "無法取得使用者資訊",
        });
      }
    }),

  // 更新使用者角色（僅管理員）
  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可更新使用者角色",
        });
      }

      // 防止移除最後一個管理員
      if (input.role === "user") {
        const db = await getDb();
        if (!db) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "資料庫連接失敗",
          });
        }

        try {
          const adminUsers = await db
            .select()
            .from(users)
            .where(eq(users.role, "admin"));

          if (adminUsers.length === 1 && adminUsers[0].id === input.id) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "無法移除最後一個管理員",
            });
          }
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          console.error("[Database] Failed to check admin count:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "無法驗證管理員數量",
          });
        }
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "資料庫連接失敗",
        });
      }

      try {
        const result = await db
          .update(users)
          .set({ role: input.role })
          .where(eq(users.id, input.id));

        if (!result) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "使用者不存在",
          });
        }

        const updatedUser = await db
          .select()
          .from(users)
          .where(eq(users.id, input.id))
          .limit(1);

        return updatedUser[0];
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Database] Failed to update user role:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "無法更新使用者角色",
        });
      }
    }),

  // 刪除使用者（僅管理員）
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可刪除使用者",
        });
      }

      // 防止刪除自己
      if (input.id === ctx.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "無法刪除自己的帳號",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "資料庫連接失敗",
        });
      }

      try {
        // 檢查是否為最後一個管理員
        const userToDelete = await db
          .select()
          .from(users)
          .where(eq(users.id, input.id))
          .limit(1);

        if (userToDelete.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "使用者不存在",
          });
        }

        if (userToDelete[0].role === "admin") {
          const adminUsers = await db
            .select()
            .from(users)
            .where(eq(users.role, "admin"));

          if (adminUsers.length === 1) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "無法刪除最後一個管理員",
            });
          }
        }

        await db.delete(users).where(eq(users.id, input.id));

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Database] Failed to delete user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "無法刪除使用者",
        });
      }
    }),

  // 搜尋使用者（僅管理員）
  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "僅管理員可搜尋使用者",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "資料庫連接失敗",
        });
      }

      try {
        // 簡單的搜尋實現 - 在實際應用中可以使用更複雜的查詢
        const allUsers = await db.select().from(users);
        const query = input.query.toLowerCase();

        return allUsers.filter(
          (user) =>
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.openId.toLowerCase().includes(query)
        );
      } catch (error) {
        console.error("[Database] Failed to search users:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "無法搜尋使用者",
        });
      }
    }),
});
