

export const createUser = (usersCollection) => async (req, res) => {
    try {
        const user = req.body;
        const query = { email: user.email };
        const existingUser = await usersCollection.findOne(query);

        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User already exists",
            });
        }

        const newUser = {
            ...user,
            createdAt: new Date(),
        };

        const result = await usersCollection.insertOne(newUser);

        res.status(201).send({
            success: true,
            message: "User created successfully",
            result,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};