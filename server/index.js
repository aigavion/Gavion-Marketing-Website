import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@gavion.ai',
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  passLength: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

const sendConfirmationEmail = async (toEmail, name) => {
  const mailOptions = {
    from: `"Gavion" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Thank you for contacting Gavion!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #10b981; margin: 0;">Thank You, ${name}!</h1>
        </div>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          We appreciate you reaching out to Gavion. Your message has been received, and we're excited to learn more about your needs.
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          <strong>Our sales team will be in contact with you as soon as possible.</strong>
        </p>
        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          In the meantime, feel free to learn more about our services at <a href="https://gavion.ai" style="color: #10b981;">gavion.ai</a>
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
          <p>© 2024 Gavion. All rights reserved.</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

const sendNotificationEmail = async (leadData) => {
  const { name, email, company, message } = leadData;
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const mailOptions = {
    from: `"Gavion Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
    subject: `New Lead: ${name} - ${company || 'No Company'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #10b981;">🎉 New Lead Received!</h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p style="margin: 10px 0;"><strong>Submitted:</strong> ${timestamp}</p>
        </div>
        
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; white-space: pre-wrap;">${message || 'No message provided'}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <a href="mailto:${email}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reply to Lead</a>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    console.log('Sending confirmation email to:', email);
    await sendConfirmationEmail(email, name);
    console.log('Confirmation email sent');

    console.log('Sending notification email');
    await sendNotificationEmail({ name, email, company, message });
    console.log('Notification email sent');

    res.json({
      success: true,
      message: 'Thank you for your message! We will be in touch soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/test-smtp', async (req, res) => {
  try {
    await transporter.verify();
    res.json({ success: true, message: 'SMTP connection successful' });
  } catch (error) {
    res.json({ success: false, error: error.message, code: error.code });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
