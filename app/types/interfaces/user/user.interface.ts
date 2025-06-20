import { Types } from "mongoose";

export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    sessionToken: string;
    createdAt: Date;
}