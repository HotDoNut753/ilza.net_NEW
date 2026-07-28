# Iłża.Net — strona 2026

Wielostronicowa witryna firmowa zbudowana w Next.js. Projekt działa lokalnie i
jest przygotowany do późniejszego wdrożenia na Vercel.

## Uruchomienie

```bash
npm install
npm run dev
```

Strona będzie dostępna pod adresem `http://localhost:3000`.

## Sprawdzenie projektu

```bash
npm run lint
npm run build
```

## Formularz kontaktowy

Formularz korzysta z endpointu `/api/contact`. W środowisku produkcyjnym wysyła
wiadomości przez Resend. Skopiuj `.env.example` do `.env.local` i ustaw:

```text
RESEND_API_KEY=
CONTACT_FROM_EMAIL=Iłża.Net <formularz@ilza.net>
CONTACT_TO_EMAIL=biuro@ilza.net
```

Adres nadawcy musi należeć do domeny zweryfikowanej w Resend. Te same zmienne
należy później dodać w ustawieniach projektu na Vercelu.

Bez klucza API formularz działa w trybie lokalnym: przygotowuje wiadomość i
otwiera domyślny program pocztowy użytkownika.
