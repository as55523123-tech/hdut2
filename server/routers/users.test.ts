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

describe("users router", () => {
  let adminCaller: ReturnType<typeof appRouter.createCaller>;
  let userCaller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    adminCaller = appRouter.createCaller(createAdminContext());
    userCaller = appRouter.createCaller(createUserContext());
  });

  it("should prevent non-admin from listing users", async () => {
    try {
      await userCaller.users.list();
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should allow admin to list users", async () => {
    const users = await adminCaller.users.list();
    expect(Array.isArray(users)).toBe(true);
  });

  it("should prevent non-admin from getting user", async () => {
    try {
      await userCaller.users.get({ id: 1 });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should prevent non-admin from updating user role", async () => {
    try {
      await userCaller.users.updateRole({ id: 2, role: "admin" });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should prevent non-admin from deleting user", async () => {
    try {
      await userCaller.users.delete({ id: 2 });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should prevent non-admin from searching users", async () => {
    try {
      await userCaller.users.search({ query: "test" });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should allow admin to search users", async () => {
    const results = await adminCaller.users.search({ query: "admin" });
    expect(Array.isArray(results)).toBe(true);
  });

  it("should prevent admin from deleting themselves", async () => {
    try {
      await adminCaller.users.delete({ id: 1 });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should prevent admin from removing last admin role", async () => {
    // This test assumes there's only one admin with id 1
    try {
      await adminCaller.users.updateRole({ id: 1, role: "user" });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should return 404 for non-existent user", async () => {
    try {
      await adminCaller.users.get({ id: 99999 });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("NOT_FOUND");
    }
  });
});
