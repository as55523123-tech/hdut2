import { eq, and, desc, ilike, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, news, InsertNews, News } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// News/Latest Messages functions
export async function createNews(data: InsertNews): Promise<News | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create news: database not available");
    return null;
  }

  try {
    const result = await db.insert(news).values(data);
    const id = result[0].insertId;
    return await getNewsById(Number(id));
  } catch (error) {
    console.error("[Database] Failed to create news:", error);
    throw error;
  }
}

export async function getNewsById(id: number): Promise<News | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return null;
  }

  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function listNews(filters?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<News[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list news: database not available");
    return [];
  }

  try {
    const conditions: any[] = [];

    if (filters?.status) {
      conditions.push(eq(news.status, filters.status as any));
    }
    if (filters?.category) {
      conditions.push(eq(news.category, filters.category as any));
    }

    let query: any = db.select().from(news);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(news.publishedAt || news.createdAt));

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  } catch (error) {
    console.error("[Database] Failed to list news:", error);
    throw error;
  }
}

export async function searchNews(searchQuery: string): Promise<News[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot search news: database not available");
    return [];
  }

  try {
    const results = await db
      .select()
      .from(news)
      .where(
        or(
          ilike(news.title, `%${searchQuery}%`),
          ilike(news.content, `%${searchQuery}%`),
          ilike(news.excerpt, `%${searchQuery}%`)
        )
      )
      .orderBy(desc(news.publishedAt || news.createdAt));

    return results;
  } catch (error) {
    console.error("[Database] Failed to search news:", error);
    throw error;
  }
}

export async function updateNews(id: number, data: Partial<InsertNews>): Promise<News | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update news: database not available");
    return null;
  }

  try {
    await db.update(news).set(data).where(eq(news.id, id));
    return await getNewsById(id);
  } catch (error) {
    console.error("[Database] Failed to update news:", error);
    throw error;
  }
}

export async function deleteNews(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete news: database not available");
    return false;
  }

  try {
    await db.delete(news).where(eq(news.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete news:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
