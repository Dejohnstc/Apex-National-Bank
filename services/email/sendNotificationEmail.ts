import { Resend } from "resend";

interface SendNotificationEmailInput {
  to: string;
  title: string;
  message: string;
  actionUrl?: string;
}

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendNotificationEmail({
  to,
  title,
  message,
  actionUrl,
}: SendNotificationEmailInput) {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    "";

  const url = actionUrl
    ? actionUrl.startsWith("http")
      ? actionUrl
      : `${appUrl}${actionUrl}`
    : "";

  const button = url
    ? `
      <p style="margin-top:24px;">
        <a
          href="${url}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#111827;
            color:#ffffff;
            text-decoration:none;
            border-radius:8px;
            font-weight:600;
          "
        >
          View Details
        </a>
      </p>
    `
    : "";

  const { error } =
    await resend.emails.send({
      from:
        process.env.NOTIFICATION_EMAIL_FROM ??
        "Apex National Bank <notifications@example.com>",

      to: [to],

      subject: title,

      html: `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin:0;
              padding:0;
              background:#f5f7fa;
              font-family:Arial,sans-serif;
              color:#111827;
            "
          >
            <div
              style="
                max-width:600px;
                margin:40px auto;
                background:#ffffff;
                border-radius:12px;
                padding:32px;
              "
            >
              <h2 style="margin-top:0;">
                ${title}
              </h2>

              <p
                style="
                  font-size:16px;
                  line-height:1.6;
                  color:#4b5563;
                "
              >
                ${message}
              </p>

              ${button}

              <p
                style="
                  margin-top:32px;
                  font-size:12px;
                  color:#9ca3af;
                "
              >
                This is an automated notification
                from Apex National Bank.
              </p>
            </div>
          </body>
        </html>
      `,
    });

  if (error) {
    console.error(
      "Notification email failed:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}