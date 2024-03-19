"use client";

import { useEffect, useState } from "react";
import CardWrapper from "../CardWrapper/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/verification-token";
import { FormSuccess } from "../FormHandlers/Success/form-success";
import {FormError} from "../FormHandlers/Error/form-error";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const serachParams = useSearchParams();

  const token = serachParams.get("token");

  const onSubmit = () => {
    if (!token) {
      setError("Missing Token!");
    }

    newVerification(token as string)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Somenthing went wrong");
      });
  };

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification Email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center w-full justify-center">
        {!error && !success && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
