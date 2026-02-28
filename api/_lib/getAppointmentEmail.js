// api/_lib/getAppointmentEmail.js
export function getAppointmentEmailHtml({
  name,
  phone,
  email,
  service,
  message,
}) {
  const brand = "#0ea5a4";
  return `
<!DOCTYPE html>
<html>
  <body style="background-color: #f6f9fc; font-family: Arial, sans-serif; margin: 0; padding: 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e5e7eb;">
      <h2 style="margin: 0; font-size: 18px; color: #0f172a;">Programare nouă - CardioCore</h2>
      <p style="color: #475569; font-size: 14px;">Detalii primite prin formularul de contact:</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="font-size: 14px; line-height: 1.6;">
        <b style="color: ${brand};">Nume:</b> ${name}<br />
        <b style="color: ${brand};">Telefon:</b> ${phone}<br />
        <b style="color: ${brand};">Email:</b> ${email || "—"}<br />
        <b style="color: ${brand};">Serviciu:</b> ${service || "—"}
      </p>
      ${
        message
          ? `
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p style="font-size: 14px; line-height: 1.6;">
          <b style="color: ${brand};">Mesaj:</b><br />
          ${message}
        </p>
      `
          : ""
      }
      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">
        Email generat automat de platforma CardioCore
      </p>
    </div>
  </body>
</html>`;
}
