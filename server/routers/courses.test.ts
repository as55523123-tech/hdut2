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

describe("courses router", () => {
  let adminCaller: ReturnType<typeof appRouter.createCaller>;
  let userCaller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    adminCaller = appRouter.createCaller(createAdminContext());
    userCaller = appRouter.createCaller(createUserContext());
  });

  it("should list courses", async () => {
    const courses = await adminCaller.courses.list();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  it("should allow admin to create course", async () => {
    const newCourse = await adminCaller.courses.create({
      level: "中級",
      code: "B1-B2",
      title: "進階華語課程",
      description: "深化語言能力",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-09-30"),
      capacity: 25,
      instructor: "王老師",
      schedule: "週二、四 14:00-16:00",
    });

    expect(newCourse).toBeDefined();
    expect(newCourse.title).toBe("進階華語課程");
    expect(newCourse.id).toBeDefined();
  });

  it("should prevent non-admin from creating course", async () => {
    try {
      await userCaller.courses.create({
        level: "中級",
        code: "B1-B2",
        title: "進階華語課程",
        description: "深化語言能力",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-09-30"),
        capacity: 25,
        instructor: "王老師",
        schedule: "週二、四 14:00-16:00",
      });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should get course by id", async () => {
    const courses = await adminCaller.courses.list();
    if (courses.length > 0) {
      const course = await adminCaller.courses.get({ id: courses[0].id! });
      expect(course).toBeDefined();
      expect(course.id).toBe(courses[0].id);
    }
  });

  it("should allow admin to update course", async () => {
    const courses = await adminCaller.courses.list();
    if (courses.length > 0) {
      const updated = await adminCaller.courses.update({
        id: courses[0].id!,
        level: "高級",
        code: "C1-C2",
        title: "精通華語課程",
        description: "達到母語接近水平",
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-12-31"),
        capacity: 15,
        instructor: "陳老師",
        schedule: "週一、三 10:00-12:00",
      });

      expect(updated.title).toBe("精通華語課程");
    }
  });

  it("should prevent non-admin from updating course", async () => {
    const courses = await adminCaller.courses.list();
    if (courses.length > 0) {
      try {
        await userCaller.courses.update({
          id: courses[0].id!,
          level: "高級",
          code: "C1-C2",
          title: "精通華語課程",
          description: "達到母語接近水平",
          startDate: new Date("2025-09-01"),
          endDate: new Date("2025-12-31"),
          capacity: 15,
          instructor: "陳老師",
          schedule: "週一、三 10:00-12:00",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    }
  });

  it("should allow admin to delete course", async () => {
    const courses = await adminCaller.courses.list();
    const initialCount = courses.length;

    if (initialCount > 0) {
      const result = await adminCaller.courses.delete({ id: courses[0].id! });
      expect(result.success).toBe(true);

      const updatedCourses = await adminCaller.courses.list();
      expect(updatedCourses.length).toBeLessThan(initialCount);
    }
  });

  it("should prevent non-admin from deleting course", async () => {
    const courses = await adminCaller.courses.list();
    if (courses.length > 0) {
      try {
        await userCaller.courses.delete({ id: courses[0].id! });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    }
  });
});
