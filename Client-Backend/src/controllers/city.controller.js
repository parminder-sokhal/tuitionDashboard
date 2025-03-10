import City from "../models/City.model.js";
import  Area  from "../models/Area.model.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import  ErrorHandler from "../utils/errorHandler.js";

// export const getAllCities = async (req, res, next) => {
//   try {
//     const cities = await City.find({ isLive: true });
//     if (!cities.length) {
//       return next(new ErrorHandler(404, "No cities found."));
//     }
//     res.status(200).json(cities);
//   } catch (err) {
//     next(new ErrorHandler(500, err.message));
//   }
// };
export const getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find({ isdeleted: false });

    if (!cities) {
      return next(new ErrorHandler(404, "No cities found."));
    }

    res.status(200).json({
      success: true,
      message: "Cities fetched successfully",
      cities,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const createCity = async (req, res, next) => {
  const { AreaId } = req.params;

  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler(400, "City name is required"));
  }

  try {
    const area = await Area.findOne({_id:AreaId, isdeleted: false});
    if (!area) {
      return next(new ErrorHandler(404, "Area not found"));
    }

    const existingCity = await City.findOne({ name, isdeleted: false });
    if (existingCity) {
      return next(new ErrorHandler(400, "City already exists"));
    }

    const newCity = await City.create({
      name,
      // createdBy: userId,
    });

    //Add the city to the area
    area.cityId.push(newCity._id);

    await area.save();

    res.status(201).json({
      success: true,
      message: "City created successfully",
      city: newCity,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const updateCity = async (req, res, next) => {
  const { cityId } = req.params;
  const { name } = req.body;

  try {
    const updatedCity = await City.findById({_id:cityId, isdeleted: false});

    if (!updatedCity) {
      return next(new ErrorHandler(404, "City not found"));
    }

    updatedCity.name = name || updatedCity.name;
    // updatedCity.updatedBy = 1;

    await updatedCity.save();

    res.status(200).json({
      success: true,
      message: "City updated successfully",
      city: updatedCity,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const deleteCity = async (req, res, next) => {
  const { cityId } = req.params;

  try {
    const city = await City.findById({_id:cityId, isdeleted: false});

    if (!city) {
      return next(new ErrorHandler(404, "City not found"));
    }

    city.isdeleted = true;
    // city.deletedBy = 1;
    city.deletedAt = new Date();

    await city.save();
    res.status(200).json({
      success: true, 
      message: "City marked as deleted"
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

//get city by id
export const getCityById = catchAsyncError(async (req, res, next) => {

  const { id } = req.params;
  
  const city = await City.findById({ _id: id, isdeleted: false });

  if (!city) {
    return next(new ErrorHandler(404, "City not found"));
  }

  res.status(200).json({
    success: true,
    city,
  });
});

// update Live
export const updateLive = catchAsyncError(async (req, res, next) => {
  const { cityId } = req.params;

  const city = await City.findById({ _id: cityId, isdeleted:false});

  if (!city) {
    return next(new ErrorHandler(404, "City not found"));
  }

  city.isLive = !city.isLive;

  await city.save();

  res.status(200).json({
    success: true,
    message: city.isLive ? "City marked as live" : "City marked as not live",
    city,
  });



});

