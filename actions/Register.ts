"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schema/formSchema";
import { getUserByEmail } from "@/data/getUserByEmail";
/* import users from "../mongo/schemas/User";
import mongooseConnect from "@/lib/mongooseConnect"; */

/* TODO: Convert this action to prisma using mongo */

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  /*  await mongooseConnect();
   */
  const validatedFields = RegisterSchema.safeParse(values);

  /* Data Credentials Validation */
  if (!validatedFields.success) {
    return { error: "Invalid Fileds!" };
  }
  /* Validae if the user already exits */
  const { email, password, name } = validatedFields.data;

  const exitingUser = await getUserByEmail(email);

  if (exitingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  /* Create user */
  const newUser = new users({
    user: {
      name,
      email,
      password: hashedPassword,
    },
  });

  /* Save new user In the database */

  try {
    await newUser.save();
    return { success: "User Create!" };
  } catch (err: any) {
    return { error: err.stack };
  }
};
