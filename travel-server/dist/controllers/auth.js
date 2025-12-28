"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const User_1 = require("../models/User");
/**
 * Helper to get JWT config safely
 */
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const signOptions = {
            expiresIn: JWT_EXPIRE || "7d",
        };
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, signOptions);
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: error.message });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: role || "viewer",
        });
        const savedUser = await userRepository.save(user);
        const signOptions = {
            expiresIn: JWT_EXPIRE || "7d",
        };
        const token = jsonwebtoken_1.default.sign({ userId: savedUser.id, role: savedUser.role }, JWT_SECRET, signOptions);
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
    }
    catch (error) {
        return res
            .status(400)
            .json({ success: false, message: error.message });
    }
};
exports.register = register;
const getMe = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: error.message });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.js.map