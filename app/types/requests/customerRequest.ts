import { Request } from 'express';
import { ICustomer } from '../interfaces/customer/customer.interface';

export interface CreateCustomerRequest extends Request {
    body: {
        name: string
        surname: string
        address?: string
        phone?: string
        description?: string,
    };
}

export interface GetCustomersResponse {
    customers: ICustomer[],
    message: string,
}