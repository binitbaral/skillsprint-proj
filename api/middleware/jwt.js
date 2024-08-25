import jwt from "jsonwebtoken"; //create and verify json wen tokens which are used for securely transmitting info between [arties.]
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => { //function that checks if the incoming request has a valid jwt token,which is used to authenticate users
  const token = req.cookies.accessToken; //retrieve the token from the cookies
  if (!token) return next(createError(401,"You are not authenticated!"))


  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => { //it the token is invalid or exp
    if (err) return next(createError(403,"Token is not valid!"));
    /*if the token is valid,extract the user id and isseller status from the payload and
    attach them to the requet object*/
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next(); //call the middleware funcation
  });
};
