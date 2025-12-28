import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";

/**
 * Helper to get JWT config safely
 */
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRE = process.env.JWT_EXPIRE as SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const login =async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRE || "7d",
    };

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      signOptions
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    const { name, email, password, role } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || "viewer",
    });

    const savedUser = await userRepository.save(user);

    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRE || "7d",
    };

    const token = jwt.sign(
      { userId: savedUser.id, role: savedUser.role },
      JWT_SECRET,
      signOptions
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        avatar: savedUser.avatar,
      },
    });
  } catch (error: any) {
    return res
      .status(400)
      .json({ success: false, message: error.message });
  }
};

export const getMe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user?.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(req.user.userId, 10) },
      select: ["id", "name", "email", "role", "avatar", "createdAt"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};
