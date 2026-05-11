import { ObjectId } from "mongodb";

export const getAllProducts = (productsCollection) => async (req, res) => {
    try {
        const { price, search } = req.query;

        const currentPage = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const skip = (currentPage - 1) * limit;

        const query = {};
        if (search) {
            query.productName = { $regex: search, $options: "i" }
        }

        if (price) {
            const prices = price.split("-");
            const minPrice = Number(prices[0]);
            const maxPrice = Number(prices[1]);

            query.price = {
                $gte: minPrice,
                $lte: maxPrice
            }
        }

        const result = await productsCollection
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray();

        const totalProducts = await productsCollection.countDocuments(query);

        res.status(200)
            .send({
                success: true,
                data: result,
                total: totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
            });

    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
    }
}

export const addProduct = (productsCollection) => async (req, res) => {
    try {
        const productData = req.body;
        const user = req.user;

        const product_data = {
            ...productData,
            price: Number(productData.price),
            userEmail: user.email
        }

        // console.log("deconded user ", user)

        const result = await productsCollection.insertOne(product_data);

        res
            .status(201)
            .send({
                success: true,
                result
            })

    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
    }
}

export const updateProduct = (productsCollection) => async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;

        const query = {
            _id: new ObjectId(id),
        };

        const updatedDoc = {
            $set: {
                ...updatedProduct,
                price: Number(updatedProduct.price),
            },
        };

        const result = await productsCollection.updateOne(
            query,
            updatedDoc
        );

        res.send(result);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const deleteProductById = (productsCollection) => async (req, res) => {
    try {
        const id = req.params.id;

        const query = { _id: new ObjectId(id) }

        const result = await productsCollection.deleteOne(query);
        // console.log("dlete rs", result);

        if (result.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            result,
        });
    } catch (error) {
        res.status(500)
            .send({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
    }
}
