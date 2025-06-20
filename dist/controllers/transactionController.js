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
exports.getLastFiveTransaction = exports.getCustomerTotals = exports.getTotals = exports.deleteTransaction = exports.updateTransaction = exports.getTransaction = exports.getCustomerTransactions = exports.createTransaction = exports.getTransactions = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
const mongodb_1 = require("mongodb");
const customer_1 = __importDefault(require("../models/customer"));
// GET /transactions
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_1.default.find().sort({ createdAt: 'desc' });
        res.status(200).json({ data: transactions, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getTransactions = getTransactions;
// POST /transactions
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, customerId, date, transactionCategory, transactionType, isCompleted } = req.body;
        const newTransaction = new transaction_1.default({
            amount,
            description,
            customerId: new mongodb_1.ObjectId(customerId), // Convert customerId to ObjectId
            date,
            transactionCategory,
            transactionType,
            isCompleted: isCompleted !== null && isCompleted !== void 0 ? isCompleted : false, // Default to false if not provided
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        // Save the transaction and get its ID
        yield newTransaction.save();
        // Debugging: Log the customerId being used to find the user
        const customer = yield customer_1.default.findById(customerId);
        if (!customer) {
            console.log('customer not found for customerId:', customer);
            return res.status(404).json({ message: 'User not found' });
        }
        customer.transactions.push(newTransaction._id);
        yield customer.save();
        res.status(200).json({ message: 'Transaction created successfully', transaction: newTransaction });
    }
    catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createTransaction = createTransaction;
// GET /transaction/getCustomerTransactions/:id
const getCustomerTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const transactions = yield transaction_1.default.find({ customerId: customerId });
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the customer' });
        }
        res.status(200).json({ data: transactions, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getCustomerTransactions = getCustomerTransactions;
// GET /transactions/:id
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transaction_1.default.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getTransaction = getTransaction;
// PUT /transactions/:id
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, transactionType, transactionCategory, customerId, isCompleted } = req.body;
        const updateData = {
            updatedAt: new Date().toISOString()
        };
        // Only include fields that are provided in the request
        if (amount !== undefined)
            updateData.amount = amount;
        if (description !== undefined)
            updateData.description = description;
        if (transactionType !== undefined)
            updateData.transactionType = transactionType;
        if (transactionCategory !== undefined)
            updateData.transactionCategory = transactionCategory;
        if (customerId !== undefined)
            updateData.customerId = new mongodb_1.ObjectId(customerId);
        if (isCompleted !== undefined)
            updateData.isCompleted = isCompleted;
        const updatedTransaction = yield transaction_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateTransaction = updateTransaction;
// DELETE /transactions/:id
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTransaction = yield transaction_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteTransaction = deleteTransaction;
const getTotals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totals = yield transaction_1.default.aggregate([
            {
                $match: {
                    isCompleted: { $ne: true } // Only include transactions that are not completed
                }
            },
            {
                $group: {
                    _id: {
                        transactionType: "$transactionType",
                        transactionCategory: "$transactionCategory",
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    transactionType: "$_id.transactionType",
                    transactionCategory: "$_id.transactionCategory",
                    totalAmount: 1,
                },
            },
        ]);
        res.status(200).json({ data: totals, message: "success" });
    }
    catch (error) {
        console.error("Error fetching totals:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getTotals = getTotals;
const getCustomerTotals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }
        const totals = yield transaction_1.default.aggregate([
            {
                $match: {
                    customerId: new mongodb_1.ObjectId(id),
                    isCompleted: { $ne: true } // Only include transactions that are not completed
                },
            },
            {
                $group: {
                    _id: {
                        transactionType: "$transactionType",
                        transactionCategory: "$transactionCategory",
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    transactionType: "$_id.transactionType",
                    transactionCategory: "$_id.transactionCategory",
                    totalAmount: 1,
                },
            },
        ]);
        res.status(200).json({ data: totals, message: "success" });
    }
    catch (error) {
        console.error("Error fetching customer-specific totals:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getCustomerTotals = getCustomerTotals;
const getLastFiveTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the latest 5 transactions, sorted by the createdAt field
        const transactions = yield transaction_1.default.find({})
            .sort({ createdAt: -1 }) // Sort in descending order
            .limit(5); // Limit the result to the last 5 entries
        res.status(200).json({ success: true, data: transactions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching transactions", error });
    }
});
exports.getLastFiveTransaction = getLastFiveTransaction;
