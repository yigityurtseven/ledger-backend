"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsSchema = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("../types/interfaces/transaction/transaction.interface");
const transactionSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    transactionType: { type: String, enum: Object.values(transaction_interface_1.TransactionType), required: true },
    transactionCategory: { type: String, enum: Object.values(transaction_interface_1.TransactionCategory), required: true },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
    isCompleted: { type: Boolean, required: true, default: false },
});
exports.transactionsSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
});
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
