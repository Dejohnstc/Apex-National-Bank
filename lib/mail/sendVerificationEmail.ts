import { resend } from "./resend";
import { verificationTemplate } from "./templates/verification";

type Props = {
  email: string;
  firstName: string;
  verificationToken: string;
};

export async function sendVerificationEmail({
  email,
  firstName,
  verificationToken,
}: Props) {
 const verificationUrl =
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${verificationToken}`;

  await resend.emails.send({
    from: "Apex National Bank <noreply@obiresoffice.com>",

    to: email,

    subject: "Verify Your Apex National Bank Account",

    html: verificationTemplate({
      firstName,
      verificationUrl,
    }),
  });
}