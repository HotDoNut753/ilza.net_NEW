"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        fallback?: "mailto";
        message?: string;
      };

      if (response.ok && result.ok) {
        form.reset();
        setStatus("success");
        setMessage("Dziękujemy. Wiadomość została wysłana.");
        return;
      }

      if (result.fallback === "mailto") {
        const subject = encodeURIComponent(
          `Zapytanie ze strony Iłża.Net — ${String(data.name || "")}`,
        );
        const body = encodeURIComponent(
          [
            `Imię i nazwisko: ${String(data.name || "")}`,
            `Telefon: ${String(data.phone || "")}`,
            `E-mail: ${String(data.email || "")}`,
            `Adres instalacji: ${String(data.address || "")}`,
            "",
            String(data.message || ""),
          ].join("\n"),
        );
        window.location.href = `mailto:biuro@ilza.net?subject=${subject}&body=${body}`;
        setStatus("idle");
        setMessage("Otwieram program pocztowy z gotową wiadomością.");
        return;
      }

      throw new Error(result.message || "Nie udało się wysłać formularza.");
    } catch {
      setStatus("error");
      setMessage(
        "Nie udało się wysłać wiadomości. Zadzwoń pod numer 882 564 615.",
      );
    }
  }

  return (
    <form
      className={`contactForm${compact ? " contactFormCompact" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="formGrid">
        <label>
          <span>Imię i nazwisko</span>
          <input
            autoComplete="name"
            maxLength={100}
            name="name"
            placeholder="Jan Kowalski"
            required
          />
        </label>
        <label>
          <span>Telefon</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            name="phone"
            placeholder="600 000 000"
            required
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            autoComplete="email"
            maxLength={150}
            name="email"
            placeholder="adres@email.pl"
            type="email"
          />
        </label>
        <label>
          <span>Adres instalacji</span>
          <input
            autoComplete="street-address"
            maxLength={180}
            name="address"
            placeholder="Miejscowość, ulica, numer"
          />
        </label>
      </div>
      <label className="formMessage">
        <span>Wiadomość</span>
        <textarea
          maxLength={2000}
          name="message"
          placeholder="Napisz, czego potrzebujesz..."
          required
          rows={compact ? 3 : 4}
        />
      </label>
      <label className="formConsent">
        <input name="consent" required type="checkbox" value="yes" />
        <span>
          Wyrażam zgodę na kontakt w sprawie przesłanego zapytania.
        </span>
      </label>
      <label className="formTrap" aria-hidden="true">
        <span>Strona internetowa</span>
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <div className="formSubmitRow">
        <button
          className="button buttonPrimary"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
          <span aria-hidden="true">→</span>
        </button>
        {message && (
          <p
            className={`formStatus${status === "error" ? " formStatusError" : ""}`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
