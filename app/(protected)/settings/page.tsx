"use client";

import { logOut } from "@/actions/LogOut";
import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const session = useSession();

  const onClick = () => {
    logOut();
  };

  return (
    <div>
      {JSON.stringify(session)}

      <button type="submit" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}
