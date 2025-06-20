import { model, Schema } from "mongoose";
import { ICustomer } from "../types/interfaces/customer/customer.interface";
import { transactionsSchema } from "./transaction";

const customerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    description: { type: String, required: false },
    transactions: [transactionsSchema],
}, { timestamps: true });

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;