import { NextResponse } from "next/server";

const MAX_LENGTHS = {
  name: 100,
  phone: 30,
  email: 150,
  address: 180,
  message: 2000,
};

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;

  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Nieprawidłowe dane formularza." },
      { status: 400 },
    );
  }

  if (clean(input.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(input.name, MAX_LENGTHS.name);
  const phone = clean(input.phone, MAX_LENGTHS.phone);
  const email = clean(input.email, MAX_LENGTHS.email);
  const address = clean(input.address, MAX_LENGTHS.address);
  const message = clean(input.message, MAX_LENGTHS.message);
  const consent = clean(input.consent, 10);

  if (!name || !phone || !message || consent !== "yes") {
    return NextResponse.json(
      { message: "Uzupełnij wymagane pola formularza." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Podaj poprawny adres e-mail." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { fallback: "mailto" },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "biuro@ilza.net";
  const from =
    process.env.CONTACT_FROM_EMAIL || "Iłża.Net <formularz@ilza.net>";
  const subject = `Zapytanie ze strony Iłża.Net — ${name}`;
  const text = [
    `Imię i nazwisko: ${name}`,
    `Telefon: ${phone}`,
    `E-mail: ${email || "nie podano"}`,
    `Adres instalacji: ${address || "nie podano"}`,
    "",
    message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
      "User-Agent": "ilza-net-contact-form/1.0",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html: `
        <h2>Nowe zapytanie ze strony Iłża.Net</h2>
        <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email || "nie podano")}</p>
        <p><strong>Adres instalacji:</strong> ${escapeHtml(address || "nie podano")}</p>
        <hr />
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
      ...(email ? { reply_to: email } : {}),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Usługa pocztowa nie przyjęła wiadomości." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
