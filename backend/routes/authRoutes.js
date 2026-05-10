import express from "express"
import { generateToken, logout } from "../controllers/authControllers.js";


const router = express.Router();

const authRoutes = (cookieOptions) => {
    // console.log("routes hitted")
    router.post("/generate-token", generateToken(cookieOptions));
    router.get("/logout", logout(cookieOptions))

    return router;
}

export default authRoutes;