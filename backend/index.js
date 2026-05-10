import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
const port = process.env.PORT || 9000;

import { connectDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


async function run() {
    try {

        const database = await connectDatabase();
        const productsCollection = database.collection("products");
        const usersCollection = database.collection("users");


        app.use("/auth", authRoutes(cookieOptions))

        // jwt token-------------------------
        // app.post("/generate-token", async (req, res) => {
        //     const user = req.body;
        //     console.log(user)
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //         expiresIn: "365d",
        //     });

        //     res.cookie("token", token, cookieOptions).send({ success: true, token });
        // });

        // app.get("/logout", (req, res) => {
        //     res
        //         .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        //         .send({ success: true });
        // });


        app.use("/user", userRoutes(usersCollection));


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});