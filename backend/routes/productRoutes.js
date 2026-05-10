import express from "express";
import { addProduct, getAllProducts } from "../controllers/productControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const productRoutes = (productsCollection) => {
    const router = express.Router();

    router.get("/", getAllProducts(productsCollection))
    router.post("/", verifyToken, addProduct(productsCollection));

    return router;
}

export default productRoutes;