<?php
/**
 * Contact Form Handler
 * 
 * Handles contact form submissions, file uploads, and sends emails to admin and user
 */

// Start output buffering to prevent any accidental output
ob_start();

// Suppress PHP warnings/notices that might corrupt JSON output
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', '0');

// Load configuration
require_once __DIR__ . '/config.php';

// Load PHPMailer
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Clean any previous output
ob_clean();

// Set headers for JSON response and CORS
header('Content-Type: application/json');

// Handle CORS
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Initialize response
$response = ['success' => false, 'message' => ''];

try {
    // Validate and sanitize input
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    if (!empty($errors)) {
        throw new Exception(implode(', ', $errors));
    }

    // Sanitize inputs
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

    // Handle file upload
    $uploadedFile = null;
    $uploadedFileName = '';
    
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];
        
        // Get file extension
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        // Validate file type
        if (!in_array($fileExt, ALLOWED_FILE_TYPES)) {
            throw new Exception('File type not allowed. Allowed types: ' . implode(', ', ALLOWED_FILE_TYPES));
        }
        
        // Validate file size
        if ($fileSize > MAX_FILE_SIZE) {
            throw new Exception('File size exceeds maximum allowed size of ' . (MAX_FILE_SIZE / 1024 / 1024) . 'MB');
        }
        
        // Generate unique filename
        $newFileName = uniqid('contact_', true) . '.' . $fileExt;
        $uploadPath = UPLOAD_DIR . $newFileName;
        
        // Move uploaded file
        if (move_uploaded_file($fileTmpName, $uploadPath)) {
            $uploadedFile = $uploadPath;
            $uploadedFileName = $fileName;
        } else {
            throw new Exception('Failed to upload file');
        }
    }

    // Send email to admin
    $adminEmailSent = sendAdminEmail($name, $email, $phone, $message, $uploadedFile, $uploadedFileName);
    
    // Send confirmation email to user
    $userEmailSent = sendUserEmail($name, $email);
    
    if ($adminEmailSent && $userEmailSent) {
        $response['success'] = true;
        $response['message'] = 'Thank you for your message! We will get back to you soon.';
    } elseif ($adminEmailSent) {
        $response['success'] = true;
        $response['message'] = 'Your message has been sent successfully!';
    } else {
        throw new Exception('Failed to send email. Please try again later.');
    }

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    http_response_code(400);
}

// Clean output buffer and send only JSON
ob_clean();
echo json_encode($response);
ob_end_flush();
exit();

/**
 * Send email to admin with contact form details using PHPMailer
 */
function sendAdminEmail($name, $email, $phone, $message, $uploadedFile, $uploadedFileName) {
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        if (USE_SMTP && !USE_MAILPIT) {
            $mail->isSMTP();
            $mail->Host       = SMTP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = SMTP_USERNAME;
            $mail->Password   = SMTP_PASSWORD;
            $mail->SMTPSecure = SMTP_ENCRYPTION;
            $mail->Port       = SMTP_PORT;
            $mail->SMTPDebug  = 0; // Disable debug output
        } elseif (USE_MAILPIT) {
            // Use Mailpit for local testing
            $mail->isSMTP();
            $mail->Host       = 'localhost';
            $mail->SMTPAuth   = false;
            $mail->Port       = 1025;
            $mail->SMTPDebug  = 0;
        }
        
        // Recipients
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress(ADMIN_EMAIL);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission - CAD Concept 3D';
        
        // Email body
        $body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #0099cc; }
                .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00d4ff; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>New Contact Form Submission</h1>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Name:</div>
                        <div class='value'>{$name}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Email:</div>
                        <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
                    </div>
                    <div class='field'>
                        <div class='label'>Phone:</div>
                        <div class='value'>{$phone}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Message:</div>
                        <div class='value'>" . nl2br($message) . "</div>
                    </div>
                    " . ($uploadedFileName ? "<div class='field'><div class='label'>Attached File:</div><div class='value'>{$uploadedFileName}</div></div>" : "") . "
                </div>
                <div class='footer'>
                    <p>This email was sent from the CAD Concept 3D contact form</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $mail->Body = $body;
        
        // Add attachment if exists
        if ($uploadedFile && file_exists($uploadedFile)) {
            $mail->addAttachment($uploadedFile, $uploadedFileName);
        }
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Admin email failed: " . $mail->ErrorInfo);
        return false;
    }
}

/**
 * Send confirmation email to user using PHPMailer
 */
function sendUserEmail($name, $email) {
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        if (USE_SMTP && !USE_MAILPIT) {
            $mail->isSMTP();
            $mail->Host       = SMTP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = SMTP_USERNAME;
            $mail->Password   = SMTP_PASSWORD;
            $mail->SMTPSecure = SMTP_ENCRYPTION;
            $mail->Port       = SMTP_PORT;
            $mail->SMTPDebug  = 0; // Disable debug output
        } elseif (USE_MAILPIT) {
            // Use Mailpit for local testing
            $mail->isSMTP();
            $mail->Host       = 'localhost';
            $mail->SMTPAuth   = false;
            $mail->Port       = 1025;
            $mail->SMTPDebug  = 0;
        }
        
        // Recipients
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress($email, $name);
        $mail->addReplyTo(ADMIN_EMAIL, FROM_NAME);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Thank you for contacting CAD Concept 3D';
        
        $body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: white; padding: 30px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Thank You for Contacting Us!</h1>
                </div>
                <div class='content'>
                    <p>Dear {$name},</p>
                    <p>Thank you for reaching out to CAD Concept 3D. We have received your message and will get back to you as soon as possible.</p>
                    <p>Our team typically responds within 24-48 hours during business days.</p>
                    <p>In the meantime, feel free to explore our services and portfolio on our website.</p>
                    <p>Best regards,<br>The CAD Concept 3D Team</p>
                </div>
                <div class='footer'>
                    <p>CAD Concept 3D | Ahmedabad, Gujarat, India</p>
                    <p>Email: thecadconcept3d@gmail.com | Phone: +91 8401440804</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $mail->Body = $body;
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("User email failed: " . $mail->ErrorInfo);
        return false;
    }
}
