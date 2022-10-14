import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(400).send("Access Denied!, no token entered");

    try {
        req.user = jwt.verify(token, process.env.jwtSecret);
        next();
    } catch (err) {
        res.status(400).send({ error: "auth failed, check auth-token" });
    }
};