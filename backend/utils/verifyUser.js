import { errorHandler } from "./error.js";
import  jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookie.access_token;

    if(!token) return next(errorHandler('Unauthorized', 401));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler('Forbidden', 403));
  

    req.user = user;
    next();
})
}