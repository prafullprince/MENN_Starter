import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// SendEmail
export const sendEmail = async (email: string, title: string, body: string) => {
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
      <h2>${title}</h2>
      <p>Your one-time code is:</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px;">${body}</p>
      <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: "From Whatsapp",
      to: `${email}`,
      subject: `${title}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send OTP email", err);
    throw err;
  }
};
