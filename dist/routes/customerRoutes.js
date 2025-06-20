"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const allowedOrigins_1 = require("../config/allowedOrigins");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const customerController_1 = require("../controllers/customerController");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)({
    origin: allowedOrigins_1.allowedOrigins,
    credentials: true
}));
//GET /api/customer
router.get('/getCustomers', authMiddleware_1.default, customerController_1.getCustomers);
router.get('/getCustomer/:id', authMiddleware_1.default, customerController_1.getCustomer);
router.get('/getTotalCustomerCount', authMiddleware_1.default, customerController_1.getTotalCustomerCount);
router.post('/createCustomer', authMiddleware_1.default, customerController_1.createCustomer);
router.post('/updateCustomer/:id', authMiddleware_1.default, customerController_1.updateCustomer);
exports.default = router;
