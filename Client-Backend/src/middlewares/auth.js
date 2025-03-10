import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/user.models.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please LogIn", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please LogIn", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});

export const authorizeAdmin = async (req, res, next) => {
 // if (req.user.role !== "SuperAdmin")
  //   return next(
  //     new ErrorHandler(
  //       `${req.user.role} is not allowed to access this resource`,
  //       403
  //     )
  //   );

  const user = await User.findOne({
    $and: [{ _id: req.user._id }, { isactive: true }],
  })
    .populate({
      path: "role",
      select: "name", // Only select the name field from the Role model
    });

  if (!user) {
    return next(new ErrorHandler("User not found or not authorized", 403));
  }

  if (user.role.name !== "SuperAdmin") {
    return next(
      new ErrorHandler(
        `${user.role.name} is not allowed to access this resource`,
        403
      )
    );
  }

  next(); // Proceed if user is a SuperAdmin
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};


