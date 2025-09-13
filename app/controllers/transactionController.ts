import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import { ObjectId } from 'mongodb';
import { CreateTransactionRequest } from '../types/requests/transactionRequest';
import Customer from '../models/customer';

// GET /transactions
export const getTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: 'desc' });
        res.status(200).json({ data: transactions, message: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// POST /transactions
export const createTransaction = async (req: CreateTransactionRequest, res: Response) => {
    try {
        const { amount, description, customerId, date, transactionCategory, transactionType, isCompleted } = req.body;

        const newTransaction = new Transaction({
            amount,
            description,
            customerId: new ObjectId(customerId), // Convert customerId to ObjectId
            date,
            transactionCategory,
            transactionType,
            isCompleted: isCompleted ?? false, // Default to false if not provided
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        // Save the transaction and get its ID
        await newTransaction.save();

        // Debugging: Log the customerId being used to find the user

        const customer = await Customer.findById(customerId);
        if (!customer) {
            console.log('customer not found for customerId:', customer);
            return res.status(404).json({ message: 'User not found' });
        }

        customer.transactions.push(newTransaction._id);
        await customer.save();

        res.status(200).json({ message: 'Transaction created successfully', transaction: newTransaction });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /transaction/getCustomerTransactions/:id
export const getCustomerTransactions = async (req: Request, res: Response) => {
    try {
        const customerId = req.params.id;
        const transactions = await Transaction.find({ customerId: customerId });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the customer' });
        }

        res.status(200).json({ data: transactions, message: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /transactions/:id
export const getTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// PUT /transactions/:id
export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const { 
            amount, 
            description, 
            transactionType,
            transactionCategory,
            customerId,
            isCompleted 
        } = req.body;

        const updateData: any = {
            updatedAt: new Date().toISOString()
        };

        // Only include fields that are provided in the request
        if (amount !== undefined) updateData.amount = amount;
        if (description !== undefined) updateData.description = description;
        if (transactionType !== undefined) updateData.transactionType = transactionType;
        if (transactionCategory !== undefined) updateData.transactionCategory = transactionCategory;
        if (customerId !== undefined) updateData.customerId = new ObjectId(customerId);
        if (isCompleted !== undefined) updateData.isCompleted = isCompleted;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE /transactions/:id
export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTotals = async (req: Request, res: Response) => {
    try {
        const totals = await Transaction.aggregate([
            {
                $match: {
                    isCompleted: false // Only include transactions that are not completed
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
    } catch (error) {
        console.error("Error fetching totals:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getCustomerTotals = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }

        const totals = await Transaction.aggregate([
            {
                $match: {
                    customerId: new ObjectId(id),
                    isCompleted: false // Only include transactions that are not completed
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
    } catch (error) {
        console.error("Error fetching customer-specific totals:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getLastFiveTransaction = async (req: Request, res: Response) => {
    try {
        // Fetch the latest 5 transactions, sorted by the createdAt field
        const transactions = await Transaction.find({})
            .sort({ createdAt: -1 }) // Sort in descending order
            .limit(5); // Limit the result to the last 5 entries

        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching transactions", error });
    }
};