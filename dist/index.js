"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
const cors_1 = __importDefault(require("cors"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173' || ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['*'], // Allowed headers
}));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/protected', protectedRoutes_1.default);
app.use('/api/customer', customerRoutes_1.default);
app.use('/api/transaction', transactionRoutes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
