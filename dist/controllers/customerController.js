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
exports.getTotalCustomerCount = exports.updateCustomer = exports.createCustomer = exports.getCustomer = exports.getCustomers = void 0;
const customer_1 = __importDefault(require("../models/customer"));
const getCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user exists
        if (!req.user || !req.user._id) {
            return res.status(401).json({ customers: [], message: 'Unauthorized' });
        }
        // Fetch customers from the database
        const customers = yield customer_1.default.find();
        if (!customers || customers.length === 0) {
            return res.status(404).json({ customers: [], message: 'Customers not found' });
        }
        return res.json({ data: customers, message: 'success' });
    }
    catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ data: [], message: 'Server error' });
    }
});
exports.getCustomers = getCustomers;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const customer = yield customer_1.default.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ data: customer, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ data: null, message: 'Server error' });
    }
});
exports.getCustomer = getCustomer;
// Create a new customer
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, phone, description } = req.body;
    try {
        const customer = new customer_1.default({ name, surname, phone, description });
        yield customer.save();
        res.status(200).json({ data: customer, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createCustomer = createCustomer;
// Update a customer by ID
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, surname, address, phone, description } = req.body;
    try {
        const customer = yield customer_1.default.findByIdAndUpdate(id, { name, surname, address, phone, description }, { new: true });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ data: customer, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ data: null, message: 'Server error' });
    }
});
exports.updateCustomer = updateCustomer;
const getTotalCustomerCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Count the total number of customers
        const customerCount = yield customer_1.default.countDocuments();
        res.status(200).json({ success: true, data: customerCount });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching customer count", error });
    }
});
exports.getTotalCustomerCount = getTotalCustomerCount;
