import { model, Schema } from "mongoose";
import { TransactionCategory, ITransaction, TransactionType } from "../types/interfaces/transaction/transaction.interface";


const transactionSchema = new Schema<ITransaction>({
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    transactionType: { type: String, enum: Object.values(TransactionType), required: true },
    transactionCategory: { type: String, enum: Object.values(TransactionCategory), required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
    isCompleted: { type: Boolean, required: true, default: false },
});

export const transactionsSchema = new Schema<ITransaction>({
    _id: { type: String, required: true },
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;