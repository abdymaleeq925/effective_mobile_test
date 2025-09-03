import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

const prisma = new PrismaClient();

interface RegisterData {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  role?: Role;
}

interface LoginData {
  email: string;
  password: string;
}

interface BlockData {
  isActive: boolean;
}

export const registerUser = async (data: RegisterData) => {
    console.log('Received birthDate:', data.birthDate, 'Type:', typeof data.birthDate);
    const birthDateString = data.birthDate.trim();
    
    const dateRegex = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
    const match = birthDateString.match(dateRegex);
    
    if (!match) {
      throw new Error('Invalid birthDate: Please provide a valid date in YYYY-MM-DD format');
    }
  
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
  
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error('Invalid birthDate: Month must be between 1-12, day between 1-31');
    }
  
    const parsedDate = new Date(year, month - 1, day);
    
    if (
      isNaN(parsedDate.getTime()) ||
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      throw new Error('Invalid birthDate: Provided date is not valid');
    }
  
    if (parsedDate > new Date()) {
      throw new Error('Invalid birthDate: Birth date cannot be in the future');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        birthDate: parsedDate,
        email: data.email,
        password: hashedPassword,
        role: data.role || Role.USER,
      },
    });
  };

export const loginUser = async (data: LoginData) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !await bcrypt.compare(data.password, user.password)) {
    throw new Error('Invalid credentials');
  }
  if (!user.isActive) {
    throw new Error('User is blocked');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, fullName: true, birthDate: true, email: true, role: true, isActive: true },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, fullName: true, birthDate: true, email: true, role: true, isActive: true },
  });
};

export const blockUser = async (id: number, data: BlockData) => {
    const isActive = data.isActive !== undefined ? data.isActive : false;
    
    return prisma.user.update({
      where: { id },
      data: { isActive },
      select: { 
        id: true, 
        fullName: true, 
        birthDate: true, 
        email: true, 
        role: true, 
        isActive: true 
      },
    });
  };