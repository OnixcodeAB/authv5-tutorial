"use server";
import * as z from "zod";
import { LoginSchema } from "@/schema/formSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/getUserByEmail";
import { generateVerificationToken } from "@/lib/token";
import { generateTwoFactorToken } from "@/lib/token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fileds!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  // Email Verification Token
  if (!existingUser.emailVerified) {
    const veryficationToken = await generateVerificationToken(
      existingUser.email
    );

    sendVerificationEmail(veryficationToken.email, veryficationToken.token);

    return { success: "Confirmation email send" };
  }

  // 2FA Genarate

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //TODO: verify the code:
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid Token!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid Token" };
      }

      const hasExpired = new Date(twoFactorToken.token) < new Date();

      if (hasExpired) {
        return { error: "Code expired" };
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingUser.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went Wrong" };
      }
    }
    throw error;
  }
  return { success: "Email sent" };
};
