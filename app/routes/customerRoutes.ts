import { Router } from 'express';
import cors from 'cors';
import { allowedOrigins } from '../config/allowedOrigins';
import authMiddleware from '../middleware/authMiddleware';
import { createCustomer, getCustomer, getCustomers, getTotalCustomerCount, updateCustomer } from '../controllers/customerController';

const router = Router();

router.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

//GET /api/customer
router.get('/getCustomers', authMiddleware, getCustomers);
router.get('/getCustomer/:id', authMiddleware, getCustomer);
router.get('/getTotalCustomerCount', authMiddleware, getTotalCustomerCount);

router.post('/createCustomer', authMiddleware, createCustomer);
router.post('/updateCustomer/:id', authMiddleware, updateCustomer);

export default router;
