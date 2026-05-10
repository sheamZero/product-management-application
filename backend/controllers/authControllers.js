import jwt from 'jsonwebtoken'


export const generateToken = (cookieOptions) => async (req, res) => {
    const user = req.body;
    // console.log("auth controllers --? ", user)
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
    });

    res.cookie("token", token, cookieOptions).send({ success: true, token });
}


export const logout = (cookieOptions) => (req, res) => {
    console.log("hitt logout controller")
    res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
    res.send({ success: true });
};