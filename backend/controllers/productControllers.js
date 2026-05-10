

export const addProduct = (productsCollection) => async (req, res) => {
    try {
        const productData = req.body;

        const result = await productsCollection.insertOne(productData);

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

