import { Request } from 'express';
import { TransactionCategory, TransactionType } from '../interfaces/transaction/transaction.interface';

export interface CreateTransactionRequest extends Request {
	body: {
		amount: number;
		customerId: string;
		date: Date | string;
		description?: string;
		transactionType: TransactionType;
		transactionCategory: TransactionCategory;
		isCompleted?: boolean;
	};
}
