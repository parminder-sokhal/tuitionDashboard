import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ContactForm from "../models/ContactForm.model.js";
import  ErrorHandler from "../utils/errorHandler.js";
import sendWhatsAppMessage from "../service/whatsappService.js"

export const getAllContactForms = async (req, res, next) => {

  try {
    const contactForms = await ContactForm.find({ isdeleted: false });  
    if (!contactForms.length) {
      return next(new ErrorHandler(404, "No contact forms found."));
    }
    
    res.status(200).json({
      success: true,
      message: "Contact forms fetched successfully",
      contactForms: contactForms,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));  
  }
};

export const submitContactForm = async (req, res, next) => {
  const { name, number, whatsappNumber, email, role, class: className, subjectList, timeslot, feeRange } = req.body;

  if (!name || !number || !email || !role || !className || !subjectList || !timeslot || !feeRange) {
    return next(new ErrorHandler(400, "All fields are required except 'incomplete'"));
  }

  

  try {
    const newContactForm = await ContactForm.create({
      name,
      number,
      whatsappNumber,
      email,
      role,
      class: className,
      subjectList,
      timeslot,
      feeRange,
    });
    const mobile = number;

    const message = `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nTechTimes Team`;

    const response = await sendWhatsAppMessage(mobile, message);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      contactForm: newContactForm,
      // response
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));  
  }
};

export const updateContactForm = async (req, res, next) => {
  const { formId } = req.params;
  const { name, number, whatsappNumber, email, role, class: className, subjectList, timeslot, feeRange } = req.body;

  try {
    const updatedContactForm = await ContactForm.findById({_id:formId, isdeleted: false});

    if (!updatedContactForm) {
      return next(new ErrorHandler(404, "Contact form not found"));
    }

    updatedContactForm.name = name || updatedContactForm.name;
    updatedContactForm.number = number || updatedContactForm.number;
    updatedContactForm.whatsappNumber = whatsappNumber || updatedContactForm.whatsappNumber;
    updatedContactForm.email = email || updatedContactForm.email;
    updatedContactForm.role = role || updatedContactForm.role;
    updatedContactForm.class = className || updatedContactForm.class;
    updatedContactForm.subjectList = subjectList || updatedContactForm.subjectList;
    updatedContactForm.timeslot = timeslot || updatedContactForm.timeslot;
    updatedContactForm.feeRange = feeRange || updatedContactForm.feeRange;
    

    const contactForm = await updatedContactForm.save();
    res.status(200).json({
      success: true,
      message: "Contact form updated successfully",
      contactForm: contactForm,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const deleteContactForm = async (req, res, next) => {
  const { formId } = req.params;

  try {
    const contactForm = await ContactForm.findById({_id:formId, isdeleted: false});

    if (!contactForm) {
      return next(new ErrorHandler(404, "Contact form not found"));
    }

    contactForm.isdeleted = true;
    contactForm.deletedAt = new Date(); 


    await contactForm.save();
    res.status(200).json({ 
      success: true,
      message: "Contact form marked as deleted",
      contactForm: contactForm, 
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

// contact from by id
export const getContactFormById = catchAsyncError(async (req, res, next) => {
  const { formId } = req.params;

  const contactForm = await ContactForm.findById({_id:formId, isdeleted: false});

  if (!contactForm) {
    return next(new ErrorHandler(404, "Contact form not found"));
  }

  res.status(200).json({
    success: true,
    message: "Contact form fetched successfully",
    contactForm: contactForm,
  });
});

//update Live
export const updateLiveFrom = catchAsyncError(async (req, res, next) => {
  const { formId } = req.params;

  const contactForm = await ContactForm.findById({_id:formId, isdeleted: false});
  if (!contactForm) {
    return next(new ErrorHandler(404, "Contact form not found"));
  }
  contactForm.isLive = !contactForm.isLive;
  await contactForm.save();
  res.status(200).json({
    success: true,
    message: "Contact form updated successfully",
    contactForm: contactForm,
  });
});

//update incomplete
export const updateIncomplete = catchAsyncError(async (req, res, next) => {
  const { formId } = req.params;

  const contactForm = await ContactForm.findById({_id:formId, isdeleted: false});
  
  if (!contactForm) {
    return next(new ErrorHandler(404, "Contact form not found"));
  }
  contactForm.incomplete = !contactForm.incomplete;
  await contactForm.save();
  res.status(200).json({
    success: true,
    message: "Contact form updated successfully",
    contactForm: contactForm,
  });
});