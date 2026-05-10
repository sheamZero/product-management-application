

export const getAllProducts = (productsCollection) => async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const skip = (currentPage - 1) * limit;

        const result = await productsCollection
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();

        const totalProducts = await productsCollection.estimatedDocumentCount();

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

        console.log("deconded user ", user)

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

