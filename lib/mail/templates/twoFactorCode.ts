type TwoFactorTemplateProps = {
  firstName: string;
  code: string;
};

export function twoFactorTemplate({
  firstName,
  code,
}: TwoFactorTemplateProps) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Security Verification</title>
</head>

<body style="margin:0;padding:40px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="620" align="center" style="background:#fff;border-radius:12px;overflow:hidden;">

<tr>
<td style="background:#0f172a;padding:35px;text-align:center;">
<h1 style="color:white;margin:0;">
Apex National Bank
</h1>
</td>
</tr>

<tr>
<td style="padding:45px;">

<h2>Hello ${firstName},</h2>

<p>
Use the verification code below to complete your sign in.
</p>

<div
style="
margin:40px auto;
width:220px;
text-align:center;
padding:20px;
background:#f1f5f9;
font-size:34px;
font-weight:bold;
letter-spacing:8px;
border-radius:10px;
">
${code}
</div>

<p>
This code expires in <strong>10 minutes</strong>.
</p>

<p>
If you didn't attempt to sign in, please secure your account immediately.
</p>

</td>
</tr>

<tr>
<td style="background:#f8fafc;padding:25px;text-align:center;color:#64748b;font-size:13px;">
© ${new Date().getFullYear()} Apex National Bank
</td>
</tr>

</table>

</body>
</html>
`;
}