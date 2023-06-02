import { eq } from "drizzle-orm";
import { db } from ".";
import { DBUser, InsertUser, insertUserSchema, users } from "./schema";



type GetUsersOptions = QueryOptions<DBUser> & {
  username?: DBUser['username'],
}

export const getUsers = ({ username, columns, limit, offset }: GetUsersOptions = {}) => {
  return db.query.users.findMany({
    columns,
    limit,
    offset,
    where: username ? eq(users.username, username) : undefined
  });
}

export const insertUser = async (user: InsertUser) => {
  const parsedUser = insertUserSchema.safeParse(user)
  return parsedUser.success ?
    db.insert(users).values(user) :
    parsedUser.error
}

export const assignRoleToUser = (username: DBUser['username'], role: DBUser['role']) => {
  return db.update(users).set({ role })
    .where(eq(users.username, username))
}
