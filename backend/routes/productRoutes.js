import express from "express";
import { addProduct, deleteProductById, getAllProducts } from "../controllers/productControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const productRoutes = (productsCollection) => {
    const router = express.Router();

    router.get("/", getAllProducts(productsCollection))
    router.post("/", verifyToken, addProduct(productsCollection));
    router.delete("/:id", verifyToken, deleteProductById(productsCollection));

    return router;
}

export default productRoutes;