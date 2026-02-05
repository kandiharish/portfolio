# How to Set Up Email Sending (EmailJS)

To make the contact form work, you need to link it to your EmailJS account. Follow these simple steps:

## 1. Get Your Keys from EmailJS
1.  Go to [https://www.emailjs.com/](https://www.emailjs.com/) and **Sign Up** (it's free).
2.  **Add a Service**:
    *   Click "Email Services" -> "Add New Service" -> Select "Gmail" (or your preferred provider).
    *   Click "Connect Account" and follow the login.
    *   Copy the **Service ID** (e.g., `service_xxxx`).
3.  **Create a Template (and Get ID)**:
    *   Click "Email Templates" on the left sidebar.
    *   Click "Create New Template".
    *   Design your email (e.g., Subject: "New Message from Portfolio").
    *   Click "Save" (top right).
    *   **Finding the ID**: After saving, look at the URL or the "Settings" tab of that template. It usually starts with `template_`.
    *   Copy this **Template ID**.
4.  **Get Public Key**:
    *   Click on your name in the top-right corner -> "Account".
    *   Copy the **Public Key** (e.g., `user_xxxx` or a random string).

## 2. Add Keys to Your Project
1.  In your project folder (`c:\Portfolio`), create a new file named `.env` (if it doesn't exist).
2.  Paste your keys into the file like this:

```env
VITE_EMAILJS_SERVICE_ID=service_example123
VITE_EMAILJS_TEMPLATE_ID=template_example456
VITE_EMAILJS_PUBLIC_KEY=public_key_example789
```

## 3. Restart the Server
Changes to `.env` files only take effect after restarting the server.
1.  Go to your terminal running the portfolio.
2.  Press `Ctrl + C` to stop it.
3.  Run `npm run dev` again.

**That's it!** Your contact form will now send emails directly to you.

## ⚠️ Troubleshooting Common Errors
**Error: "412 Gmail_API: Request had insufficient authentication scopes"**
*   **Cause**: You didn't give EmailJS permission to send emails during login.
*   **Fix**:
    1.  Go back to EmailJS -> Email Services.
    2.  **Disconnect** your Gmail service.
    3.  Click **Connect Account** again.
    4.  **Crucial**: When the Google popup appears, make sure to **CHECK THE BOX** that says *"Send email on your behalf"* (click "Continue" or "Allow" only after checking it).
