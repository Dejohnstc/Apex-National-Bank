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
  const startTime = Date.now();
  
  console.log("========================================");
  console.log(`[Email] START sending to: ${email}`);
  console.log(`[Email] API Key present: ${!!process.env.RESEND_API_KEY}`);
  console.log(`[Email] APP_URL: ${process.env.NEXT_PUBLIC_APP_URL}`);
  console.log(`[Email] Token length: ${token?.length || 0}`);
  
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  console.log(`[Email] Reset URL: ${resetUrl}`);

  try {
    const response = await resend.emails.send({
      from: "Apex National Bank <noreply@obiresoffice.com>",
      to: email,
      subject: "Reset Your Apex National Bank Password",
      html: resetPasswordTemplate({
        firstName,
        resetUrl,
      }),
    });

    const duration = Date.now() - startTime;
    console.log(`[Email] Resend responded in ${duration}ms`);
    console.log(`[Email] FULL RESPONSE:`, JSON.stringify(response, null, 2));

    if (response.error) {
      console.error(`[Email] ❌ RESEND RETURNED ERROR:`, response.error);
      throw new Error(`Resend error: ${response.error.message}`);
    }

    console.log(`[Email] ✅ SUCCESS. Email ID: ${response.data?.id}`);
    console.log("========================================");
    
    return response;
  } catch (err) {
    const duration = Date.now() - startTime;
    console.error(`[Email] 💥 FAILED after ${duration}ms`);
    console.error(`[Email] Error type:`, err instanceof Error ? err.constructor.name : typeof err);
    console.error(`[Email] Error message:`, err instanceof Error ? err.message : err);
    console.error(`[Email] Full error:`, err);
    console.log("========================================");
    throw err;
  }
}