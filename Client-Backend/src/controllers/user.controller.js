import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorHandler } from "../utlis/error.js";


//login
export const login = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  if (!(username === "superAdmin" && password === "Admin123")) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  res.status(200).json({
    success: true,
    message: "Logged In Successfully",
  });


});