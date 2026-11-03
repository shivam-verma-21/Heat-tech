<?php
function field_value($key, $max_length)
{
    if (!isset($_POST[$key]) || !is_string($_POST[$key])) {
        return '';
    }

    $value = trim($_POST[$key]);
    $value = preg_replace('/[\r\n\t]+/', ' ', $value);
    $value = strip_tags($value);

    if (strlen($value) > $max_length) {
        return '';
    }

    return $value;
}

function respond($status, $message)
{
    http_response_code($status);
    header('Content-Type: text/plain; charset=UTF-8');
    echo $message;
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Please submit the enquiry form to contact Heat Tech Technology.');
}

$name = field_value('name', 100);
$company = field_value('company', 120);
$phone = field_value('phone', 30);
$email = field_value('email', 254);
$product = field_value('product', 120);
$message = field_value('message', 4000);

if ($name === '' || $phone === '' || $message === '') {
    respond(400, 'Please provide your name, phone number and message.');
}

if (!preg_match('/^\+?[0-9\s().-]{7,30}$/', $phone)) {
    respond(400, 'Please provide a valid phone number.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, 'Please provide a valid email address or leave the field blank.');
}

$to = 'heattech482@gmail.com';
$subject = 'Website enquiry - Heat Tech Technology';
$body = "Name: {$name}\nCompany: {$company}\nPhone: {$phone}\nEmail: {$email}\nProduct / requirement: {$product}\n\nMessage:\n{$message}\n";
$headers = [
    'From: Heat Tech Technology <heattech482@gmail.com>',
    'Content-Type: text/plain; charset=UTF-8'
];

if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

if (mail($to, $subject, $body, implode("\r\n", $headers))) {
    respond(200, 'Thank you. Your enquiry was submitted successfully.');
}

respond(503, 'We could not submit your enquiry right now. Please call +91 70167 77922 or email heattech482@gmail.com.');
?>
