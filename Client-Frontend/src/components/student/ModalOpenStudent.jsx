import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useAreaData } from "../../hook/areaData";
import { useSubjectData } from "../../hook/subjectData";
import { useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  createStudent,
  updateStudentById,
  getAllStudents,
} from "../../redux/actions/studentAction";

const animatedComponents = makeAnimated();

const ModalOpenStudent = ({
  open,
  handleClose,
  handleSave,
  isEditing,
  data,
}) => {
  const { liveAreas: areas } = useAreaData();
  const { liveSubjects: subjects } = useSubjectData();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [className, setClassName] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [chargeRate, setChargeRate] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");
  const [errors, setErrors] = useState({}); // Error state for feedback

  useEffect(() => {
    if (!open) return;

    if (isEditing && data) {
      setName(data?.name || "");
      setEmail(data?.email || "");
      setPhone(data?.phone || "");
      setGender(data?.gender || "");
      setClassName(data?.class || "");
      setAboutUs(data?.aboutUs || "");
      setChargeRate(data?.chargeRate || "");
      setSelectedSubjects(data?.subject?.map((sub) => sub._id) || []);
      setAreaId(data?.area?._id || "");
      setImage(null);
      setImagePrev(data?.image?.url || "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setGender("");
      setClassName("");
      setAboutUs("");
      setChargeRate("");
      setSelectedSubjects([]);
      setAreaId("");
      setImage(null);
      setImagePrev("");
    }
  }, [open, isEditing, data]);

  const validateName = (name) => name.trim() !== "";
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateAboutUs = (aboutUs) => {
    const wordCount = aboutUs.split(" ").filter(Boolean).length;
    return wordCount <= 25;
  };
  const validateImage = (image, imagePrev, isEditing) => {
    if (isEditing && imagePrev) {
      return true;
    }

    if (image) {
      return true;
    }

    return false;
  };
  const validateForm = () => {
    const formErrors = {};
  
    if (!validateName(name)) formErrors.name = "Name is required";
    if (!validateEmail(email)) formErrors.email = "Invalid email";
    if (!phone) formErrors.phone = "Phone number is required";
    if (!gender) formErrors.gender = "Gender is required";
    if (!className) formErrors.className = "Class is required";
    if (!validateAboutUs(aboutUs)) formErrors.aboutUs = "About Us must contain not more than 150 words.";
    if (!chargeRate) formErrors.chargeRate = "Board is required.";
    if (!selectedSubjects || selectedSubjects.length === 0) formErrors.selectedSubjects = "At least one subject must be selected.";
    if (!areaId) formErrors.areaId = "Area is required.";
    if (!validateImage(image, imagePrev, isEditing)) formErrors.image = "Image is required";
  
    setErrors(formErrors); // Set error state to trigger re-render and show validation messages.
  
    // Return true if no errors, otherwise false.
    return Object.keys(formErrors).length === 0;
  };
  
  const handleInputChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhone(value);
    if (field === "gender") setGender(value);
    if (field === "className") setClassName(value);
    if (field === "aboutUs") setAboutUs(value);
    if (field === "chargeRate") setChargeRate(value);
    if (field === "areaId") setAreaId(value);

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (field === "name" && !validateName(value)) {
        updatedErrors.name = "Name is required";
      } else if (field === "name") {
        delete updatedErrors.name;
      }

      if (field === "email" && !validateEmail(value)) {
        updatedErrors.email = "Invalid email";
      } else if (field === "email") {
        delete updatedErrors.email;
      }

      if (field === "aboutUs" && !validateAboutUs(value)) {
        updatedErrors.aboutUs =
          "About Us must contain not more than 150 words.";
      } else if (field === "aboutUs") {
        delete updatedErrors.aboutUs;
      }

      if (field === "chargeRate" && !value) {
        updatedErrors.chargeRate = "Board Us is required.";
      } else if (field === "chargeRate") {
        delete updatedErrors.chargeRate;
      }

      return updatedErrors;
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^[0-9]*$/; // Only allow numbers, up to 10 digits
     if (!phoneRegex.test(value)) {
      setPhone(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Enter numbers only",
      }));
    } 
    // If the value has more than 10 digits, show 'Enter 10 digits only'
    else if (value.length > 10) {
      setPhone(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Enter 10 digits only",
      }));
    } 
    // If the value is valid and contains 10 or fewer digits, clear the error
    else {
      setPhone(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "", // Clear error when input is valid
      }));
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePrev(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePrev("");
    }
  };

  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions.map((option) => option.value));
  };

  const handleAreaChange = (selectedOption) => {
    setAreaId(selectedOption ? selectedOption.value : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // If validation fails, prevent form submission

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("className", className);
    formData.append("aboutUs", aboutUs);
    formData.append("chargeRate", chargeRate);
    formData.append("subjectId", selectedSubjects.join(","));
    formData.append("areaId", areaId);
    formData.append("file", image);

    try {
      dispatch(createStudent(formData)).then(() => {
        dispatch(getAllStudents());
      });
      handleSave();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // If validation fails, prevent form submission

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("className", className);
    formData.append("aboutUs", aboutUs);
    formData.append("chargeRate", chargeRate);
    formData.append("subjectId", selectedSubjects.join(","));
    formData.append("areaId", areaId);
    if (image) {
      formData.append("file", image);
    }

    try {
      dispatch(updateStudentById(data._id, formData)).then(() => {
        dispatch(getAllStudents());
      });
      handleSave();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    }
  };

  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: subject.name,
  }));
  const areaOptions = areas.map((area) => ({
    value: area._id,
    label: area.name,
  }));
  const chargeRateOptions = [
    "BSEB",
    "CBSE",
    "ICSE",
    "BSMEB",
    "All Board",
    "State Board",
    "IB",
    "Others",
  ];

  const chargeRateOptionsMapped = chargeRateOptions.map((rate) => ({
    label: rate,
    value: rate,
  }));

  return (
    <>
      {open && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content p-6 bg-white rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit Student" : "Add Student"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium">Name</label>
                <Input
                  value={name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Phone</label>
                <Input
                  value={phone}
                  onChange={handlePhoneChange} // Updated to use the new function
                  placeholder="Enter Phone"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Class</label>
                <Input
                  value={className}
                  onChange={(e) =>
                    handleInputChange("className", e.target.value)
                  }
                  placeholder="Enter Class"
                />
                {errors.className && (
                  <p className="text-red-500 text-sm">{errors.className}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">About Us</label>
                <Input
                  value={aboutUs}
                  onChange={(e) => handleInputChange("aboutUs", e.target.value)}
                  placeholder="About Us"
                />
                {errors.aboutUs && (
                  <p className="text-red-500 text-sm">{errors.aboutUs}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Subjects</label>
                <div className="relative z-10">
                  <Select
                    menuPortalTarget={document.body} // ensures the dropdown is rendered outside the modal container
                    menuPosition="fixed" // keeps dropdown in place
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    value={subjectOptions.filter((option) =>
                      selectedSubjects.includes(option.value)
                    )}
                    onChange={handleSubjectChange}
                    options={subjectOptions}
                    className="w-full border rounded-lg text-sm"
                  />
                  {errors.selectedSubjects && (
                    <p className="text-red-500 text-sm">
                      {errors.selectedSubjects}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Area</label>
                <div className="relative">
                  <Select
                    value={areaOptions.find(
                      (option) => option.value === areaId
                    )}
                    onChange={handleAreaChange}
                    options={areaOptions}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    className="w-full border rounded-lg text-sm"
                    isClearable={true}
                  />
                  {errors.areaId && (
                    <p className="text-red-500 text-sm">{errors.areaId}</p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Board</label>
                <div className="relative">
                  <Select
                    value={
                      chargeRate
                        ? { value: chargeRate, label: chargeRate }
                        : null
                    }
                    onChange={(selectedOption) =>
                      handleInputChange(
                        "chargeRate",
                        selectedOption?.value || ""
                      )
                    }
                    options={chargeRateOptionsMapped}
                    className="w-full border rounded-lg text-sm"
                    isClearable={true}
                  />
                  {errors.chargeRate && (
                    <p className="text-red-500 text-sm">{errors.chargeRate}</p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">
                  Upload Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
                {imagePrev && <img src={imagePrev} alt="Preview" width="150" />}
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={isEditing ? handleEditStudent : handleSubmit}
              >
                {isEditing ? "Save Changes" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOpenStudent;
