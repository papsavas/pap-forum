import { eq } from "drizzle-orm";
import { db } from ".";
import { DBUser, InsertUser, insertUserSchema, users } from "./schema";

export const insertUser = (user: InsertUser) => {
  const parsedUser = insertUserSchema.safeParse(user)
  return parsedUser.success ?
    db.insert(users).values(user) :
    parsedUser.error
}

type GetUsersOptions = {
  username?: DBUser['username'],
  columns?: { [K in keyof Partial<DBUser>]: boolean }
}
export const getUsers = async ({ username, columns }: GetUsersOptions) => {
  return db.query.users.findMany({
    columns,
    where: username ? eq(users.username, username) : undefined
  });
}

