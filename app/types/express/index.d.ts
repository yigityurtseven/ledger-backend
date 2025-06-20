import 'express';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user/user.interface';

declare global {
    namespace Express {
        interface Request {
            user?: IUser & Document | any;
        }
    }
}

