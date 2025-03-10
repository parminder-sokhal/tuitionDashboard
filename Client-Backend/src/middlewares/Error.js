import logger from "../logger/winston.logger.js"
import ErrorHandler from "../utils/errorHandler.js";

// const ErrorMiddleware = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;

//   err.message = err.message || "Internal Server Error";

//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };
const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = err;

  // Check if the error is an instance of an ApiError class which extends native Error class
  if (!(error instanceof ErrorHandler)) {
    // if not
    // create a new ApiError instance to keep the consistency

    // assign an appropriate status code
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new ErrorHandler(statusCode, message, error?.errors || [], err.stack);
  }

  // Now we are sure that the `error` variable will be an instance of ApiError class
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  logger.error(`${error.message}`);



  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
