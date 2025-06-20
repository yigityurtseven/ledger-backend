import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface DecodedToken extends jwt.JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
        // Transform the token payload into your desired format
        const formattedToken = {
            userId: decoded.userId,
            issuedAt: decoded.iat,
            expiration: decoded.exp
        };

        // Find the user associated with the decoded userId
        const user = await User.findById(formattedToken.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid session' });
        }
        // Ensure that the ID matches
        if (user._id.toString() !== decoded.userId) {
            return res.status(401).json({ message: 'Invalid session' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;
