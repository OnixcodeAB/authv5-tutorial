import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
console.log(session.data?.user.isOAuth)
  return session.data?.user;
};
