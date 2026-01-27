# Contact Form Backend - Setup Guide

## Overview
This directory contains the PHP backend for the CAD Concept 3D contact form. It handles form submissions, file uploads, and sends emails to both admin and users.

## Files
- **config.php** - Configuration file for email settings and file upload preferences
- **contact-handler.php** - Main handler that processes form submissions
- **.htaccess** - Security configuration for the uploads directory
- **uploads/** - Directory where uploaded files are stored (created automatically)

## Configuration

### Email Settings
Edit `config.php` to configure your email settings:

```php
define('ADMIN_EMAIL', 'thecadconcept3d@gmail.com'); // Change to your admin email
define('FROM_EMAIL', 'noreply@cadconcept3d.com');   // Change to your domain email
define('FROM_NAME', 'CAD Concept 3D');
```

### SMTP Configuration (Optional)
If you want to use SMTP instead of PHP's built-in `mail()` function:

1. Set `USE_SMTP` to `true` in `config.php`
2. Configure your SMTP credentials:
```php
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com');
define('SMTP_PASSWORD', 'your-app-password');
define('SMTP_ENCRYPTION', 'tls');
```

**Note:** For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833).

### File Upload Settings
Customize file upload settings in `config.php`:

```php
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_FILE_TYPES', [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 
    'jpg', 'jpeg', 'png', 'gif',
    'zip', 'rar', '7z',
    'dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'stl', 'obj'
]);
```

### CORS Settings
Add your production domain to the allowed origins in `config.php`:

```php
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'https://yourdomain.com',
    'https://www.yourdomain.com'
]);
```

## Testing

### Local Testing
1. Make sure Laragon is running
2. Your API endpoint will be available at: `http://localhost/cadconcept/api/contact-handler.php`
3. Submit the contact form on your website to test

### Email Testing
- Check that admin receives emails at the configured `ADMIN_EMAIL`
- Check that users receive confirmation emails
- Verify file attachments are included in admin emails

## Troubleshooting

### Emails Not Sending
1. **Check PHP mail configuration**: Make sure your server has `sendmail` or similar configured
2. **Use SMTP**: Configure SMTP settings for more reliable email delivery
3. **Check spam folder**: Emails might be marked as spam
4. **Check error logs**: Look in Laragon's PHP error logs

### File Upload Issues
1. **Check permissions**: Make sure the `uploads/` directory is writable (755 or 777)
2. **Check file size**: Ensure uploaded files are under the `MAX_FILE_SIZE` limit
3. **Check file type**: Verify the file extension is in `ALLOWED_FILE_TYPES`

### CORS Errors
1. Make sure your domain is in the `ALLOWED_ORIGINS` array
2. Check browser console for specific CORS error messages
3. Verify the API endpoint URL is correct

## Security Features

✅ **Input Validation** - All form inputs are validated and sanitized
✅ **File Type Validation** - Only allowed file types can be uploaded
✅ **File Size Limits** - Prevents large file uploads
✅ **Secure File Naming** - Files are renamed with unique IDs to prevent exploits
✅ **CORS Protection** - Only allowed origins can submit forms
✅ **Directory Protection** - `.htaccess` prevents direct access to uploaded files

## Production Deployment

Before deploying to production:

1. ✅ Update `ADMIN_EMAIL` to your production email
2. ✅ Update `FROM_EMAIL` to use your domain email
3. ✅ Add your production domain to `ALLOWED_ORIGINS`
4. ✅ Configure SMTP for reliable email delivery
5. ✅ Test the contact form thoroughly
6. ✅ Set up email monitoring to ensure emails are being delivered

## Support
For issues or questions, contact: thecadconcept3d@gmail.com
