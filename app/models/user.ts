import { Schema, model } from 'mongoose';
import { IUser } from '../types/interfaces/user/user.interface';

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sessionToken: { type: String, default: '' }
}, {
    timestamps: true
});

const User = model<IUser>('User', userSchema);


export default User;