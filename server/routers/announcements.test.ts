import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock user contexts
function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("announcements router", () => {
  let adminCaller: ReturnType<typeof appRouter.createCaller>;
  let userCaller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    adminCaller = appRouter.createCaller(createAdminContext());
    userCaller = appRouter.createCaller(createUserContext());
  });

  it("should list published announcements", async () => {
    const announcements = await adminCaller.announcements.list();
    expect(Array.isArray(announcements)).toBe(true);
    // All returned announcements should be published
    announcements.forEach((a) => {
      expect(a.status).toBe("published");
    });
  });

  it("should allow admin to create announcement", async () => {
    const newAnnouncement = await adminCaller.announcements.create({
      type: "招生",
      date: new Date(),
      title: "新學期招生公告",
      excerpt: "本中心開放新學期課程報名",
      status: "published",
    });

    expect(newAnnouncement).toBeDefined();
    expect(newAnnouncement.title).toBe("新學期招生公告");
    expect(newAnnouncement.id).toBeDefined();
  });

  it("should prevent non-admin from creating announcement", async () => {
    try {
      await userCaller.announcements.create({
        type: "招生",
        date: new Date(),
        title: "新學期招生公告",
        excerpt: "本中心開放新學期課程報名",
        status: "published",
      });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should get announcement by id", async () => {
    const announcements = await adminCaller.announcements.list();
    if (announcements.length > 0) {
      const announcement = await adminCaller.announcements.get({
        id: announcements[0].id!,
      });
      expect(announcement).toBeDefined();
      expect(announcement.id).toBe(announcements[0].id);
    }
  });

  it("should allow admin to update announcement", async () => {
    const announcements = await adminCaller.announcements.list();
    if (announcements.length > 0) {
      const updated = await adminCaller.announcements.update({
        id: announcements[0].id!,
        type: "活動",
        date: new Date(),
        title: "更新的公告標題",
        excerpt: "更新的公告摘要",
        status: "published",
      });

      expect(updated.title).toBe("更新的公告標題");
      expect(updated.type).toBe("活動");
    }
  });

  it("should prevent non-admin from updating announcement", async () => {
    const announcements = await adminCaller.announcements.list();
    if (announcements.length > 0) {
      try {
        await userCaller.announcements.update({
          id: announcements[0].id!,
          type: "活動",
          date: new Date(),
          title: "更新的公告標題",
          excerpt: "更新的公告摘要",
          status: "published",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    }
  });

  it("should allow admin to delete announcement", async () => {
    const announcements = await adminCaller.announcements.list();
    const initialCount = announcements.length;

    if (initialCount > 0) {
      const result = await adminCaller.announcements.delete({
        id: announcements[0].id!,
      });
      expect(result.success).toBe(true);

      const updatedAnnouncements = await adminCaller.announcements.list();
      expect(updatedAnnouncements.length).toBeLessThan(initialCount);
    }
  });

  it("should prevent non-admin from deleting announcement", async () => {
    const announcements = await adminCaller.announcements.list();
    if (announcements.length > 0) {
      try {
        await userCaller.announcements.delete({ id: announcements[0].id! });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    }
  });

  it("should return 404 for non-existent announcement", async () => {
    try {
      await adminCaller.announcements.get({ id: "non-existent-id" });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("NOT_FOUND");
    }
  });
});
