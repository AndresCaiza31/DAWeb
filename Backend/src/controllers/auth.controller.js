import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { registerUser } from '../services/auth.service.js';
import { sendVerificationEmail } from '../services/email.service.js';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (!email.endsWith('@epn.edu.ec')) {
      return res.status(400).json({ error: "Solo se permiten correos de la EPN" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "La contraseña es muy débil" });
    }

    const user = await registerUser(req.body);
    
    await sendVerificationEmail(user.email, user.firstName, user.lastName, user.verificationToken);

    res.status(201).json({ 
      message: "Usuario creado exitosamente. Por favor revisa tu bandeja de entrada para verificar tu cuenta." 
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Este correo ya se encuentra registrado." });
    }
    
    console.log("ERROR EXACTO:", error);
    res.status(500).json({ error: "Error interno del servidor. Intenta más tarde." });
  }
};

export const verifyAccount = async (req, res) => {
  const { token } = req.params;
  
  const user = await prisma.user.findFirst({ where: { verificationToken: token } });
  if (!user) return res.status(400).json({ message: "Token inválido" });

  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true, verificationToken: null }
  });

  res.json({ message: "Cuenta verificada con éxito" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  if (!user.isVerified) return res.status(401).json({ message: "Debes verificar tu cuenta primero" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { name: user.name, role: user.role } });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const rToken = crypto.randomBytes(32).toString('hex');
    
    const sql = `UPDATE "User" SET "resetToken" = '${rToken}' WHERE "email" = '${email}'`;

    await prisma.$executeRawUnsafe(sql);

    const user = await prisma.user.findFirst({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Token de recuperación generado con éxito", resetToken: rToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await prisma.user.findFirst({ where: { resetToken: token } });
    if (!user) return res.status(400).json({ message: "El token es inválido o ha expirado" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: hashedPassword,
        resetToken: null
      }
    });

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        learningStyle: true,
        currentSemester: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};