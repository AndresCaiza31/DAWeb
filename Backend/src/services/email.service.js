import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (userEmail, firstName, lastName, token) => {
  const confirmUrl = `${process.env.FRONTEND_URL}/confirm/${token}`;
  const fullName = `${firstName} ${lastName}`;

  const mailOptions = {
    from: `"Plataforma TSDS" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: 'Verifica tu cuenta institucional ESFOT',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
        <h2 style="color: #1e3a8a; text-align: center;">¡Bienvenido a TSDS!</h2>
        <p style="color: #374151; font-size: 16px;">Hola <strong>${fullName}</strong>,</p>
        <p style="color: #374151; font-size: 16px;">Gracias por registrarte. Para poder acceder a tu entorno autónomo de aprendizaje, necesitamos verificar tu correo institucional.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verificar mi cuenta</a>
        </div>
        <p style="color: #6b7280; font-size: 14px; text-align: center;">Si el botón no funciona, copia y pega el siguiente enlace:</p>
        <p style="color: #3b82f6; font-size: 12px; word-break: break-all; text-align: center;">${confirmUrl}</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};