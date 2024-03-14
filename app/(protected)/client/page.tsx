"use client";
import UserInfo from "@/components/UserInfo/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default async function ClientPage() {
  const user = await useCurrentUser();
  return <UserInfo user={user} label=" 👩‍🔧 Client component" />;
}
