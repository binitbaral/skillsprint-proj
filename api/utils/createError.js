const createError = (status, message) => {
  const err = new Error(); // This creates a new instance of the Error object in JavaScript,
  err.status = status; // The HTTP status code associated with the error 
  err.message = message; //This sets the message property of the error object to the message value passed to the createError function.

  console.log(
    'hi'
  )

  return err;
};

export default createError;