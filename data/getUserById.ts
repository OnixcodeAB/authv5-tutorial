import User from "@/mongo/schemas/User";

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch {
    return null;
  }
};
