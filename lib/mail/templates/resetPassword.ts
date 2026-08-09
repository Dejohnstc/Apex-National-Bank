type ResetPasswordTemplateProps = {
  firstName: string;
  resetUrl: string;
};

export function resetPasswordTemplate({
  firstName,
  resetUrl,
}: ResetPasswordTemplateProps) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Password Reset</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 15px;">
<tr>
<td align="center">

<table role="presentation" width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#0f172a;padding:35px;text-align:center;">
<h1 style="margin:0;font-size:30px;color:#ffffff;font-weight:bold;">
Apex National Bank
</h1>
<p style="margin:10px 0 0;color:#cbd5e1;font-size:15px;">
Secure Online Banking
</p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:45px;">

<h2 style="margin:0 0 20px;color:#111827;font-size:26px;">
Password Reset Request
</h2>

<p style="font-size:16px;color:#374151;line-height:1.7;">
Hello <strong>${firstName}</strong>,
</p>

<p style="font-size:16px;color:#374151;line-height:1.7;">
We received a request to reset the password for your
<strong>Apex National Bank</strong> online banking account.
</p>

<p style="font-size:16px;color:#374151;line-height:1.7;">
To continue, please click the secure button below.
</p>

<p style="text-align:center;margin:40px 0;">
<a
href="${resetUrl}"
style="
display:inline-block;
background:#0f766e;
color:#ffffff;
text-decoration:none;
padding:16px 34px;
border-radius:8px;
font-size:16px;
font-weight:bold;
">
Reset My Password
</a>
</p>

<p style="font-size:15px;color:#6b7280;line-height:1.7;">
This password reset link will expire in
<strong>1 hour</strong> for your security.
</p>

<p style="font-size:15px;color:#6b7280;line-height:1.7;">
If the button above does not work, copy and paste this link into your browser:
</p>

<p style="word-break:break-all;font-size:14px;color:#0f766e;">
${resetUrl}
</p>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;" />

<p style="font-size:15px;color:#374151;line-height:1.7;">
<strong>Didn't request a password reset?</strong>
</p>

<p style="font-size:15px;color:#6b7280;line-height:1.7;">
If you did not request this change, you can safely ignore this email.
Your password will remain unchanged.
</p>

<p style="font-size:15px;color:#6b7280;line-height:1.7;">
If you believe someone attempted to access your account without permission,
please contact our support team immediately.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f8fafc;padding:30px;text-align:center;">

<p style="margin:0;font-size:13px;color:#6b7280;">
© ${new Date().getFullYear()} Apex National Bank. All rights reserved.
</p>

<p style="margin:10px 0 0;font-size:13px;color:#94a3b8;">
This is an automated security email. Please do not reply.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}