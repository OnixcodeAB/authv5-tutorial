import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const Social = () => {
  const searchParams = useSearchParams();
  /* const callbackUrls = searchParams.get("callbackUrl") */

  // Functioin to login with Google account or Github
  /* const onClick = (provider: "google"|"github") => {
    } */

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          "google";
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          "github";
        }}
      >
        <GitHubLogoIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
