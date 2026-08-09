import { resend } from "./resend";
import { twoFactorTemplate } from "./templates/twoFactorCode";

type Props = {
  email: string;
  firstName: string;
  code: string;
};

export async function sendTwoFactorCode({
  email,
  firstName,
  code,
}: Props) {
  const { error } = await resend.emails.send({
    from:
      "Apex National Bank <noreply@obiresoffice.com>",

    to: email,

    subject:
      "Your Apex National Bank Security Code",

    html: twoFactorTemplate({
      firstName,
      code,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }
}