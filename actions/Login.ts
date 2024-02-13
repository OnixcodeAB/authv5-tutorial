"use server";
import * as z from "zod";
import { LoginSchema } from "@/schema/formSchema";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fileds!" };
  }

  return { success: "Email sent" };
};
