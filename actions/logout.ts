"use server";

import { signOut } from "@/auth";

export const logOut = async () => {
  // Here you can add some server stuff before log out the user
  await signOut();
};
