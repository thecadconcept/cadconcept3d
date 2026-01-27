# Gmail App Password Setup Guide

To send emails through Gmail SMTP, you need to create an **App Password**. Follow these steps:

## Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", click on **2-Step Verification**
4. Follow the prompts to enable 2-Step Verification if not already enabled

## Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Enter a name like "CAD Concept Contact Form"
6. Click **Generate**
7. Google will display a 16-character password (example: `abcd efgh ijkl mnop`)
8. **Copy this password** - you won't be able to see it again

## Step 3: Configure config.php

1. Open `c:\laragon\www\cadconcept\api\config.php`
2. Find the line: `define('SMTP_PASSWORD', '');`
3. Paste your App Password (remove spaces): `define('SMTP_PASSWORD', 'abcdefghijklmnop');`
4. Save the file

## Step 4: Test

1. Submit the contact form
2. Check if emails are received in:
   - Admin inbox: thecadconcept3d@gmail.com
   - User inbox: (the email you entered in the form)

## Troubleshooting

### "Invalid credentials" error
- Make sure you're using the App Password, not your regular Gmail password
- Remove all spaces from the App Password
- Verify 2-Step Verification is enabled

### Emails not arriving
- Check spam/junk folders
- Verify `SMTP_USERNAME` matches your Gmail address
- Make sure `USE_SMTP` is set to `true` in config.php

### Still not working?
- Check PHP error logs in Laragon
- View captured emails in Mailpit: http://localhost:8025
- Set `USE_MAILPIT = true` in config.php for local testing

## Alternative: Use Mailpit for Testing

If you want to test without sending real emails:

1. Open `config.php`
2. Set `USE_MAILPIT = true`
3. Set `USE_SMTP = false`
4. View captured emails at: http://localhost:8025

This is useful for development and testing without sending actual emails.
