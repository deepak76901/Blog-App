import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = decoded;
    /* jo main jwt.sign() krte time payload dunga, vhi return m aayega,jaise abhi decoded me aaya h
     console.log(req.user);
     */
    next();
  });
};
