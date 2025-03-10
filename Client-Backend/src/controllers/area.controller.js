import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Area from "../models/Area.model.js";
import  ErrorHandler from "../utils/errorHandler.js"

//no use
export const getAreasByCityId = async (req, res, next) => {
  const { showDeleted } = req.query;  
  const { cityId } = req.params;
  try {
    const areas = showDeleted === 'true' ? await Area.find() : await Area.find({ city: cityId, isLive: true });  
    if (!areas.length) {
      return next(new ErrorHandler(404, "No areas found for the given city."));
    }
    res.status(200).json(areas);
  } catch (err) {
    next(new ErrorHandler(500, err.message));  
  }
};
//create Area
export const createArea = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name ) {
    return next(new ErrorHandler(400, "Name is required"));
  }
  
  try {
    const existingArea = await Area.findOne({ name, isdeleted: false });

    if (existingArea) {
      return next(new ErrorHandler(400, "Area already exists"));
    }

    const newArea = await Area.create({ name });

    res.status(201).json({
      success: true,
      message: "Area created successfully",
      area: newArea,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));  
  }
};

export const updateArea = async (req, res, next) => {
  const { areaId } = req.params;
  const { name } = req.body;

  try {
    const updatedArea = await Area.findById(areaId);

    if (!updatedArea) {
      return next(new ErrorHandler(404, "Area not found"));
    }

    updatedArea.name = name || updatedArea.name;
    

     await updatedArea.save();
    res.status(200).json({
      success: true,
      message: "Area updated successfully",
      area: updatedArea,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const deleteArea = async (req, res, next) => {
  const { areaId } = req.params;

  try {
    const area = await Area.findOne({_id:areaId, isdeleted: false});

    if (!area) {
      return next(new ErrorHandler(404, "Area not found"));
    }

    area.isdeleted = true;
    area.deletedAt = new Date(); 
    
    await area.save();
    res.status(200).json({
      success: true,
      message: "Area marked as deleted" 
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

//get All Areas
export const getAllAreas = catchAsyncError(async (req, res, next) => {

  const areas = await Area.find({isdeleted: false}).sort({ createdAt: 1 });


  res.status(200).json({
    success: true,
    message:"All Area Found",
    areas,
  });
});

//get Area by Id
export const getAreaById = catchAsyncError(async (req, res, next) => {

  const { areaId  } = req.params;

  const area = await Area.findById({_id:areaId, isdeleted: false})
  
  if (!area) return next(new ErrorHandler(404, "Area not found"));

  res.status(200).json({
    success: true,
    message: "Area found",
    area,
  });

});

// update Live status
export const updateLiveStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const area = await Area.findOne({_id:id, isdeleted: false});

  if (!area) return next(new ErrorHandler(404, "Area not found"));

  area.isLive = !area.isLive;
  await area.save();

  res.status(200).json({
    success: true,
    message: "Area live status updated",
    area,
  });
});

// get by getAreaByCityId 

// export const getAreaByCityId = catchAsyncError(async (req, res, next) => {
//   const { cityId } = req.params;
//   const area = await Area.find({ cityId: cityId, isdeleted: false }).populate("cityId");

//   if (!area) return next(new ErrorHandler(404, "No areas found for the given city."));

//   res.status(200).json({
//     success: true,
//     message: "Areas found by city",
//     area,
//   });
// });

export const getAreaByCityId = catchAsyncError(async (req, res, next) => {
  const { cityId } = req.params;

  const area = await Area.findOne({ cityId: { $in: [cityId] }, isdeleted: false })
    .populate("cityId");

  if (!area) return next(new ErrorHandler(404, "No area found for the given city."));

  // Extract only one city from the populated cityId array
  const singleCity = area.cityId.find(city => city._id.toString() === cityId);

  res.status(200).json({
    success: true,
    message: "Area found by city",
    area: { ...area.toObject(), cityId: singleCity }, // Override cityId with only one city
  });
});


// Get All Area live true

export const getAreaLiveTrue = catchAsyncError(async (req, res, next) => {

  const areas = await Area.find({ isLive: true, isdeleted: false }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    message:"All Live Area",
    areas,
  });
});

