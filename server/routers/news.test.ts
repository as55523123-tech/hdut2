import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("news router", () => {
  it("should allow public users to list published news", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.news.listPublished({
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should allow admin to create news", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.news.create({
      title: "Test News",
      content: "Test content",
      excerpt: "Test excerpt",
      category: "校園",
      status: "draft",
    });

    expect(result).toBeDefined();
    expect(result.title).toBe("Test News");
    expect(result.status).toBe("draft");
    expect(result.authorId).toBe(1);
  });

  it("should allow admin to list all news including drafts", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.news.listAll({
      limit: 20,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should allow admin to update news", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a news item first
    const created = await caller.news.create({
      title: "Original Title",
      content: "Original content",
      category: "課程",
      status: "draft",
    });

    // Update it
    const updated = await caller.news.update({
      id: created.id!,
      title: "Updated Title",
      status: "published",
    });

    expect(updated?.title).toBe("Updated Title");
    expect(updated?.status).toBe("published");
    expect(updated?.publishedAt).toBeDefined();
  });

  it("should allow admin to delete news", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a news item first
    const created = await caller.news.create({
      title: "To Delete",
      content: "This will be deleted",
      category: "活動",
      status: "draft",
    });

    // Delete it
    const result = await caller.news.delete({
      id: created.id!,
    });

    expect(result.success).toBe(true);
  });

  it("should allow public users to search published news", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.news.search({
      query: "test",
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should not allow public users to create news", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.news.create({
        title: "Unauthorized",
        content: "This should fail",
        category: "其他",
        status: "draft",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should not allow public users to update news", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.news.update({
        id: 1,
        title: "Unauthorized",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should not allow public users to delete news", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.news.delete({
        id: 1,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should return NOT_FOUND when getting non-existent news", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.news.getById({
        id: 99999,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("NOT_FOUND");
    }
  });

  it("should set publishedAt when publishing draft news", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const created = await caller.news.create({
      title: "Draft News",
      content: "Draft content",
      category: "公告",
      status: "draft",
    });

    expect(created.publishedAt).toBeNull();

    const published = await caller.news.update({
      id: created.id!,
      status: "published",
    });

    expect(published?.publishedAt).toBeDefined();
    expect(published?.publishedAt).not.toBeNull();
  });
});
