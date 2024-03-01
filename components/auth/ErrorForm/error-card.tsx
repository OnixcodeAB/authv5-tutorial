import CardWrapper from "@/components/CardWrapper/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive size-10" />
      </div>
    </CardWrapper>
  );
};
