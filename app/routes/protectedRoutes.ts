import { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/protected', authMiddleware, (req: Request, res: Response) => {
    console.log('Protected route accessed');
    if (req.user) {
        res.status(200).json({ message: 'This is a protected route', user: req.user });
    }
});

export default router;
