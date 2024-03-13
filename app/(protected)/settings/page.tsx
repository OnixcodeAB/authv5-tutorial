"use client";

import { logOut } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    logOut();
  };

  return (
    <div>
      {JSON.stringify(user)}

      <button type="submit" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}
