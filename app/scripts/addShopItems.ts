import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { ICustomer } from '../types/interfaces/customer/customer.interface';


const customerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: false },
    transactions: [],
});

const Customer = model<ICustomer>('Customer', customerSchema);


const customerData: Partial<ICustomer>[] = [
    {
        name: 'John',
        surname: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        description: 'A regular customer',
        transactions: [],
    },
    {
        name: 'Eylul',
        surname: 'Aksu',
        address: 'Germany... :(',
        phone: '0-57101234',
        description: 'A regular person',
        transactions: [],
    },
    {
        name: 'Irem',
        surname: 'Gozukara',
        address: 'Ordu',
        phone: '0535812389',
        description: 'wifey',
        transactions: [],
    },
    {
        name: 'Jane',
        surname: 'Smith',
        address: '456 Elm St',
        phone: '456-789-0123',
        description: 'A VIP customer',
        transactions: [],
    },
];

const run = async () => {
    try {
        await mongoose.connect('mongodb+srv://yigithanyurtseven:VD7cr9jWzT9wwPYK@ledger-test.qpkgc.mongodb.net/');

        await Customer.deleteMany({});
        await Customer.insertMany(customerData);

        console.log('Shop items added successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error adding shop items:', error);
        process.exit(1);
    }
};

run();