import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from "cookie-parser";
const port = process.env.PORT || 9000;

import { connectDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173", "https://product-management-appli-fa302.web.app"],
    credentials: true,
    optionSuccessStatus: 200,
};

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

async function run() {
    try {
        const database = await connectDatabase();
        const productsCollection = database.collection("products");
        const usersCollection = database.collection("users");

        app.use("/auth", authRoutes(cookieOptions));
        app.use("/user", userRoutes(usersCollection));
        app.use("/products", productRoutes(productsCollection));

    } catch(err) {
        console.error("DB connection error:", err);
    }
}

run();


export default app;