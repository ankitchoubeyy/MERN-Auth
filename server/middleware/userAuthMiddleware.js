import jwt from "jsonwebtoken";

export const userAuthMiddleware = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken.id){
            req.body.userId = decodedToken.id;
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default userAuthMiddleware;