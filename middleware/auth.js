import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        const token = req.header("x-Auth-token");
        jwt.verify(token, process.env.MY_SECRET_KEY);
        next();
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};
