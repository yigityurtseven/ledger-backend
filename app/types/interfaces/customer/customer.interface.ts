export interface ICustomer {
    _id: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
    transactions: string[];
    description?: string;
    __v?: number;
}