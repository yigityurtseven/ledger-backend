"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Transform the token payload into your desired format
        const formattedToken = {
            userId: decoded.userId,
            issuedAt: decoded.iat,
            expiration: decoded.exp
        };
        // Find the user associated with the decoded userId
        const user = yield user_1.default.findById(formattedToken.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid session' });
        }
        // Ensure that the ID matches
        if (user._id.toString() !== decoded.userId) {
            return res.status(401).json({ message: 'Invalid session' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.default = authMiddleware;
