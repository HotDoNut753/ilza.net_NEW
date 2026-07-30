# Iłża.Net — strona 2026

Wielostronicowa witryna firmowa zbudowana w Next.js. Projekt działa lokalnie i
jest przygotowany do publikacji jako statyczna strona na hostingu home.pl.

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

Formularz wysyła dane do pliku `public/send.php`. Po wykonaniu produkcyjnego
builda skrypt znajduje się w `out/send.php` i na hostingu home.pl wysyła
wiadomości bezpośrednio na `biuro@ilza.net`.

Adres `biuro@ilza.net` musi istnieć na tym samym hostingu home.pl, a poczta
domeny `ilza.net` musi być obsługiwana przez ten serwer. Jest to wymagane przez
home.pl dla adresu przekazywanego do funkcji `mail()` parametrem `-f`.

## Publikacja na home.pl

```bash
npm ci
npm run build
```

Po zakończeniu builda należy wgrać przez FTP całą zawartość katalogu `out`
do katalogu przypisanego do domeny `ilza.net` na hostingu home.pl.

Do uruchomienia strony i formularza na serwerze nie jest potrzebna baza danych,
Node.js, Vercel ani Resend.
