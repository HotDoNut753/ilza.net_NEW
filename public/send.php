<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function field(array $input, string $name, int $maxLength): string
{
    if (!isset($input[$name]) || !is_scalar($input[$name])) {
        return '';
    }

    $value = trim((string) $input[$name]);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['message' => 'Dozwolona jest wyłącznie metoda POST.']);
}

$contentType = (string) ($_SERVER['CONTENT_TYPE'] ?? '');

if (stripos($contentType, 'application/json') !== false) {
    $rawBody = file_get_contents('php://input');
    $input = json_decode($rawBody === false ? '' : $rawBody, true);
} else {
    $input = $_POST;
}

if (!is_array($input)) {
    respond(400, ['message' => 'Nieprawidłowe dane formularza.']);
}

// Pole-pułapka dla prostych botów. Użytkownik go nie widzi.
if (field($input, 'website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$name = field($input, 'name', 100);
$phone = field($input, 'phone', 30);
$email = field($input, 'email', 150);
$address = field($input, 'address', 180);
$message = field($input, 'message', 2000);
$consent = field($input, 'consent', 10);

if ($name === '' || $phone === '' || $message === '' || $consent !== 'yes') {
    respond(422, ['message' => 'Uzupełnij wymagane pola formularza.']);
}

if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, ['message' => 'Podaj poprawny adres e-mail.']);
}

$recipient = 'biuro@ilza.net';
$sender = 'biuro@ilza.net';
$safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? $name;
$subject = 'Zapytanie ze strony Iłża.Net — ' . $safeName;

if (function_exists('mb_encode_mimeheader')) {
    $encodedSubject = mb_encode_mimeheader(
        $subject,
        'UTF-8',
        'B',
        "\r\n"
    );
} else {
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

$body = implode("\r\n", [
    'Nowe zapytanie ze strony Iłża.Net',
    '',
    'Imię i nazwisko: ' . $name,
    'Telefon: ' . $phone,
    'E-mail: ' . ($email !== '' ? $email : 'nie podano'),
    'Adres instalacji: ' . ($address !== '' ? $address : 'nie podano'),
    '',
    'Wiadomość:',
    $message,
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Ilza.Net WWW <' . $sender . '>',
];

if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(
    $recipient,
    $encodedSubject,
    $body,
    implode("\r\n", $headers),
    '-f ' . $sender
);

if (!$sent) {
    respond(
        500,
        ['message' => 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń pod numer 882 564 615.']
    );
}

respond(200, ['ok' => true]);
