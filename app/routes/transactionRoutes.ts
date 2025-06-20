import { Router } from 'express';
import cors from 'cors';
import { allowedOrigins } from '../config/allowedOrigins';
import authMiddleware from '../middleware/authMiddleware';
import { createTransaction, getCustomerTotals, getCustomerTransactions, getLastFiveTransaction, getTotals, getTransaction, getTransactions, updateTransaction } from '../controllers/transactionController';

const router = Router();

router.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

//GET /api/transaction
router.get('/getTransactions', authMiddleware, getTransactions);
router.get('/getTransaction/:id', authMiddleware, getTransaction);
router.get('/getCustomerTransactions/:id', authMiddleware, getCustomerTransactions);
router.get('/getCustomerTotals/:id', authMiddleware, getCustomerTotals);
router.get('/getTotals', authMiddleware, getTotals);
router.get('/getLastFiveTransaction', authMiddleware, getLastFiveTransaction);

router.post('/createTransaction', authMiddleware, createTransaction);

router.put('/updateTransaction/:id', authMiddleware, updateTransaction);

export default router;
