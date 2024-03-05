"use server";

import { ResetSchema } from "@/schema/formSchema";
import { z } from "zod";
import { getUserByEmail } from "../data/getUserByEmail";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPassowordResetEmail } from "@/lib/mail";

const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPassowordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};

export default reset;
