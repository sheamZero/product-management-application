import express from "express";
import { addProduct } from "../controllers/productControllers.js";

const productRoutes = (productsCollection) => {
    const router = express.Router();

    router.post("/", addProduct(productsCollection));

    return router;
}

export default productRoutes;