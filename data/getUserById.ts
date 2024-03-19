import { db } from "@/lib/db";

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({where:{id}});
    return user;
  } catch {
    return null;
  }
};
