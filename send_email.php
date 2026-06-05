<?php
// send_email.php
// Allow CORS for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load Composer's autoloader
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Get JSON POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data"]);
    exit();
}

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($data['subject']);
$message = htmlspecialchars($data['message']);

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    
    // ==========================================
    // UBAH DENGAN EMAIL DAN APP PASSWORD GMAIL ANDA
    // ==========================================
    $mail->Username   = 'gordonsamuel310@gmail.com';                 // SMTP username (email Gmail)
    $mail->Password   = 'qndx ovap nvrp yqcs';                   // SMTP password (gunakan App Password, BUKAN password login)
    // ==========================================
    
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Enable implicit TLS encryption
    $mail->Port       = 465;                                    // TCP port to connect to

    // Recipients
    $mail->setFrom($mail->Username, 'Portfolio Contact Form');
    $mail->addAddress('gordonsamuel310@gmail.com');             // Email tujuan penerima (Email Anda)
    $mail->addReplyTo($email, $name);                           // Balas ke pengirim

    // Content
    $mail->isHTML(true);                                        // Set email format to HTML
    $mail->Subject = "[Portfolio] " . $subject;
    $mail->Body    = "<h3>Pesan Baru dari Portfolio</h3>
                      <p><strong>Nama:</strong> {$name}</p>
                      <p><strong>Email:</strong> {$email}</p>
                      <p><strong>Pesan:</strong><br/>" . nl2br($message) . "</p>";
    $mail->AltBody = "Nama: {$name}\nEmail: {$email}\nPesan:\n{$message}";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Message has been sent"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
