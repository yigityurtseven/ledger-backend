"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const allowedOrigins_1 = require("../config/allowedOrigins");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const transactionController_1 = require("../controllers/transactionController");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)({
    origin: allowedOrigins_1.allowedOrigins,
    credentials: true
}));
//GET /api/transaction
router.get('/getTransactions', authMiddleware_1.default, transactionController_1.getTransactions);
router.get('/getTransaction/:id', authMiddleware_1.default, transactionController_1.getTransaction);
router.get('/getCustomerTransactions/:id', authMiddleware_1.default, transactionController_1.getCustomerTransactions);
router.get('/getCustomerTotals/:id', authMiddleware_1.default, transactionController_1.getCustomerTotals);
router.get('/getTotals', authMiddleware_1.default, transactionController_1.getTotals);
router.get('/getLastFiveTransaction', authMiddleware_1.default, transactionController_1.getLastFiveTransaction);
router.post('/createTransaction', authMiddleware_1.default, transactionController_1.createTransaction);
router.put('/updateTransaction/:id', authMiddleware_1.default, transactionController_1.updateTransaction);
exports.default = router;
