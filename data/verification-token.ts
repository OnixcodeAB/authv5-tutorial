import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
    try {
      const verificationToken = await db.veryficationToken.findUnique({
        where: { token },
      });
      return verificationToken;
    } catch {
      null;
    }
  };

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.veryficationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    null;
  }
};
