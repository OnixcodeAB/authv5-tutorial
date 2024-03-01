"use server";
import * as z from "zod";
import { LoginSchema } from "@/schema/formSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/getUserByEmail";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fileds!" };
  }

  const { email, password } = validatedFields.data;

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
