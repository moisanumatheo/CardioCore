import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export default function AppointmentEmail({
  name,
  phone,
  email,
  service,
  message,
}) {
  const brand = "#0ea5a4";
  return (
    <Html>
      <Head />
      <Preview>Programare nouă de la {name}</Preview>
      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <Container
          style={{
            background: "#fff",
            maxWidth: 560,
            margin: "24px auto",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <Section>
            <Text
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Programare nouă
            </Text>
            <Text
              style={{ margin: "4px 0 16px", color: "#475569", fontSize: 14 }}
            >
              Detalii trimise din formularul de pe site.
            </Text>
            <Hr style={{ borderColor: "#e5e7eb", margin: "12px 0" }} />
            <Text style={{ margin: "8px 0", fontSize: 14 }}>
              <b style={{ color: brand }}>Nume:</b> {name}
              <br />
              <b style={{ color: brand }}>Telefon:</b> {phone}
              <br />
              <b style={{ color: brand }}>Email:</b> {email || "—"}
              <br />
              <b style={{ color: brand }}>Serviciu:</b> {service || "—"}
            </Text>
            {message ? (
              <>
                <Hr style={{ borderColor: "#e5e7eb", margin: "12px 0" }} />
                <Text
                  style={{
                    margin: "8px 0",
                    whiteSpace: "pre-wrap",
                    fontSize: 14,
                  }}
                >
                  <b style={{ color: brand }}>Mesaj:</b>
                  <br />
                  {message}
                </Text>
              </>
            ) : null}
          </Section>
        </Container>
        <Text style={{ textAlign: "center", color: "#94a3b8", fontSize: 12 }}>
          Email generat automat – Clinica Cardio
        </Text>
      </Body>
    </Html>
  );
}
