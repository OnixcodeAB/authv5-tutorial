import User from "@/mongo/schemas/User";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ "user.email": email });
    return user;
  } catch {
    return null;
  }
};
