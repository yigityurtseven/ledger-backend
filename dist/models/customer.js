"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transaction_1 = require("./transaction");
const customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    description: { type: String, required: false },
    transactions: [transaction_1.transactionsSchema],
}, { timestamps: true });
const Customer = (0, mongoose_1.model)('Customer', customerSchema);
exports.default = Customer;
