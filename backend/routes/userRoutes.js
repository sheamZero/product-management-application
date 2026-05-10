

import express from "express";
import { createUser } from "../controllers/userControllers.js";

const userRoutes = (usersCollection) => {
    const router = express.Router();
// console.log("object")
    router.post("/", createUser(usersCollection));

    return router;
};

export default userRoutes;