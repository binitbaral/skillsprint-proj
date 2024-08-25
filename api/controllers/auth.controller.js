import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt"; //library to hash password and copare hash password
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {      //for creating the new user
  try {
    const hash = bcrypt.hashSync(req.body.password, 5); //hashes the user's password with a salt fator 5
    const newUser = new User({ //creates a new user object with the provided details
      ...req.body,
      password: hash,
    });

    await newUser.save(); //saves the new user to the database
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //searches for the user in the database by username

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password); //compare the provided password with the stored hashed password
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign( //generates the jwt token containing the user's ID and role
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc; //removes the password form the user infermation before sending it 
    res
      .cookie("accessToken", token, {  //sets the token as a cookie and sends the user info back to the cient
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => { 
  res
    .clearCookie("accessToken", {  //removes the JWT token from the user'scookies lgooing then out
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out."); //sends a message bak to the client indicating that the user has been logout
};
