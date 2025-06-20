"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sessionToken: { type: String, default: '' }
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
