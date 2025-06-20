"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/protected', authMiddleware_1.default, (req, res) => {
    console.log('Protected route accessed');
    if (req.user) {
        res.status(200).json({ message: 'This is a protected route', user: req.user });
    }
});
exports.default = router;
