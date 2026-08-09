import { resend } from "./resend";
import { resetPasswordTemplate } from "./templates/resetPassword";

type SendPasswordResetEmailProps = {
  email: string;
  firstName: string;
  token: string;
};

export async function sendPasswordResetEmail({
  email,
  firstName,
  token,
}: SendPasswordResetEmailProps) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Apex National Bank <noreply@obiresoffice.com>",
    to: email,
    subject: "Reset Your Apex National Bank Password",
    html: resetPasswordTemplate({
      firstName,
      resetUrl,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }
}