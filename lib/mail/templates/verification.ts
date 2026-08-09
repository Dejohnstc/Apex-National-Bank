type VerificationTemplateProps = {
  firstName: string;
  verificationUrl: string;
};

export function verificationTemplate({
  firstName,
  verificationUrl,
}: VerificationTemplateProps) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f4f7fb;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="background:#0f172a;padding:30px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:28px;">
Apex National Bank
</h1>
</td>
</tr>

<tr>
<td style="padding:45px;">

<h2 style="margin-top:0;color:#111827;">
Welcome, ${firstName}
</h2>

<p style="color:#4b5563;font-size:16px;line-height:1.7;">
Thank you for choosing Apex National Bank.
</p>

<p style="color:#4b5563;font-size:16px;line-height:1.7;">
To activate your Online Banking profile, please verify your email address by clicking the button below.
</p>

<p style="text-align:center;margin:40px 0;">
<a
href="${verificationUrl}"
style="
background:#0f766e;
color:#ffffff;
text-decoration:none;
padding:16px 34px;
border-radius:8px;
display:inline-block;
font-weight:bold;
">
Verify My Email
</a>
</p>

<p style="color:#6b7280;font-size:14px;line-height:1.7;">
For your security, this verification link expires in 24 hours.
</p>

<p style="color:#6b7280;font-size:14px;">
If you did not create this account, you may safely ignore this email.
</p>

</td>
</tr>

<tr>
<td style="background:#f9fafb;padding:25px;text-align:center;font-size:13px;color:#6b7280;">
© ${new Date().getFullYear()} Apex National Bank.<br/>
Secure Digital Banking.
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