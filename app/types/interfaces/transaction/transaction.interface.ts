import { ObjectId } from "mongoose";

export interface ITransaction {
    _id: string;
    amount: number;
    description: string;
    transactionCategory: TransactionCategory;
    transactionType: TransactionType;
    createdAt: Date;
    updatedAt: Date;
    customerId: string | ObjectId;
    isCompleted: boolean;
}

export enum TransactionType {
    DEBT = 'Debt',
    CREDIT = 'Credit',
}

export enum TransactionCategory {
    DOLLAR = "Dollar",
    EURO = "Euro",
    LIRA = "Lira",
    POUND = "Pound",
    GOLD14 = 'Gold14',
    GOLD22 = "Gold22",
    GOLD24 = "Gold24",
    KULPLUCEYREK = "KulpluCeyrek",
    KULPSUZCEYREK = "KulpsuzCeyrek",
    KULPLUYARIM = "KulpluYarim",
    KULPSUZYARIM = "KulpsuzYarim",
    KULPLUTAM = "KulpluTam",
    KULPSUZTAM = "KulpsuzTam"
}