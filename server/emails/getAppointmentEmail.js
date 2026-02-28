export const getAppointmentEmailHtml = ({
  name,
  phone,
  email,
  service,
  message,
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Programare Nouă - CardioCore</h2>
          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || "Nespecificat"}</p>
          <p><strong>Serviciu:</strong> ${service}</p>
          ${message ? `<p><strong>Mesaj:</strong><br/>${message}</p>` : ""}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Acest email a fost generat automat de site-ul CardioCore.</p>
        </div>
      </body>
    </html>
  `;
};
