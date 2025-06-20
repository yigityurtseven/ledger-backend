import { NextFunction, Request, Response } from 'express';
import { CreateCustomerRequest } from '../types/requests/customerRequest';
import Customer from '../models/customer';

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if req.user exists
        if (!req.user || !req.user._id) {
            return res.status(401).json({ customers: [], message: 'Unauthorized' });
        }

        // Fetch customers from the database
        const customers = await Customer.find();

        if (!customers || customers.length === 0) {
            return res.status(404).json({ customers: [], message: 'Customers not found' });
        }

        return res.json({ data: customers, message: 'success' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ data: [], message: 'Server error' });
    }
};

export const getCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ data: customer, message: 'success' });
    } catch (error) {
        res.status(500).json({ data: null, message: 'Server error' });
    }
};

// Create a new customer
export const createCustomer = async (req: CreateCustomerRequest, res: Response) => {
    const { name, surname, phone, description } = req.body;

    try {
        const customer = new Customer({ name, surname, phone, description });
        await customer.save();
        res.status(200).json({ data: customer, message: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a customer by ID
export const updateCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, surname, address, phone, description } = req.body;

    try {
        const customer = await Customer.findByIdAndUpdate(id, { name, surname, address, phone, description }, { new: true });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ data: customer, message: 'success' });
    } catch (error) {
        res.status(500).json({ data: null, message: 'Server error' });
    }
};

export const getTotalCustomerCount = async (req: Request, res: Response) => {
    try {
        // Count the total number of customers
        const customerCount = await Customer.countDocuments();

        res.status(200).json({ success: true, data: customerCount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching customer count", error });
    }
};