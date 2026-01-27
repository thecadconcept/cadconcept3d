<?php
/**
 * Contact Form Configuration
 * 
 * Configure your email settings and file upload preferences here
 */

// Email Configuration
define('ADMIN_EMAIL', 'thecadconcept3d@gmail.com'); // Admin email to receive contact form submissions
define('FROM_EMAIL', 'noreply@cadconcept3d.com'); // From email address
define('FROM_NAME', 'CAD Concept 3D'); // From name

// SMTP Configuration (Required for sending real emails)
define('USE_SMTP', true); // Set to true after configuring Gmail App Password
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'thecadconcept3d@gmail.com'); // Your Gmail address
define('SMTP_PASSWORD', 'jetx uwti qhif okdv'); // Your Gmail App Password (16 characters, no spaces)
define('SMTP_ENCRYPTION', 'tls'); // tls or ssl

// For testing: Set to true to use Mailpit (local email testing)
// Emails will be captured at http://localhost:8025
define('USE_MAILPIT', false);

// File Upload Configuration
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB in bytes
define('ALLOWED_FILE_TYPES', [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 
    'jpg', 'jpeg', 'png', 'gif',
    'zip', 'rar', '7z',
    'dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'stl', 'obj'
]);

// CORS Configuration
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://cadconcept3d.com',
    'https://www.cadconcept3d.com'
]);

// Create uploads directory if it doesn't exist
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}
