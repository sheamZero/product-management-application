

export const createUser = (usersCollection) => async (req, res) => {
    const user = req.body;
    // console.log("user controller ", user)
    const query = { email: user.email }
    const existingUser = await usersCollection.findOne(query);

    if (existingUser) {
        return res.send({
            success: false,
            message: "User already exists",
        });
    }

    const newUser = {
        ...user,
        createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    res.send({
        success: true,
        result,
    });
}