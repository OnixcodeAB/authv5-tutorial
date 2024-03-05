import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPassowordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Link password",
    html: `<p>Click <a href="${confirmLink}">here</a> To reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Link",
    html: `<p>Click <a href="${confirmLink}">here</a> To confirm email.</p>`,
  });
};
