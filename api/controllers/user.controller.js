import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => { //find the user by ID from the request parameter
  const user = await User.findById(req.params.id); /*looks up the user in the database
   using the id provided in the request url*/

  if (req.userId !== user._id.toString()) { //checks if the id of the user making the request matches
    return next(createError(403, "You can delete only your account!")); //sends the error if the user tries to delete an account they donot own
  }
  await User.findByIdAndDelete(req.params.id); //deletes the user
  res.status(200).send("deleted.");
};
//handles fetching user datails
export const getUser = async (req, res, next) => { // looks up the user in the database using the ID provided in the request URL.
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
