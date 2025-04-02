import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useAreaData } from "../../hook/areaData";
import { useSubjectData } from "../../hook/subjectData";
import { useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  createTeacher,
  updateTeacherById,
  getAllTeachers,
} from "../../redux/actions/teacherAction.js";

const animatedComponents = makeAnimated();

const ModalOpenTeacher = ({
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
  const [aboutUs, setAboutUs] = useState("");
  const [chargeRate, setChargeRate] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    if (!open) return;

    if (isEditing && data) {
      setName(data?.name || "");
      setEmail(data?.email || "");
      setPhone(data?.phone || "");
      setAboutUs(data?.aboutUs || "");
      setChargeRate(data?.chargeRate || "");
      setSelectedSubjects(data?.subject?.map((sub) => sub._id) || []);
      setAreaId(data?.area?._id || "");
      setImage(null);
      setImagePrev(data?.image?.url || "");
      setSelectedBoard({ label: data?.board, value: data?.board } || null);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAboutUs("");
      setChargeRate("");
      setSelectedSubjects([]);
      setAreaId("");
      setImage(null);
      setImagePrev("");
      setSelectedBoard(null);
    }
  }, [open, isEditing, data]);

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

  const validatePhoneNumber = (phone) => {
    if (/[^0-9]/.test(phone)) return "Please enter only numbers";
    if (phone.length > 10) return "Phone number must be 10 digits";
    return "";
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      phone: validatePhoneNumber(phoneValue),
    }));
  };

  const validateName = (name) => name.trim() !== "";
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateAboutUs = (aboutUs) => {
    const wordCount = aboutUs.split(" ").filter(Boolean).length;
    return wordCount <= 25;
  };
  const validateChargeRate = (chargeRate) => chargeRate.trim().length <= 10;
  const validateSubject = (selectedSubjects) => selectedSubjects.length > 0;
  const validateBoard = (selectedBoard) =>
    selectedBoard !== null && selectedBoard !== undefined;
  const validateArea = (areaId) => areaId.trim() !== "";

  const validateForm = () => {
    const errors = {};

    if (!validateName(name)) errors.name = "Name is required";
    if (!validateEmail(email)) errors.email = "Invalid email";
    if (formErrors.phone) errors.phone = formErrors.phone;
    if (!phone) errors.phone = "Phone number is required.";
    if (!aboutUs) errors.aboutUs = "About Us is required.";
    if (!validateAboutUs(aboutUs))
      errors.aboutUs = "Experience must be 150 words or less";
    if (!chargeRate) errors.chargeRate = "Charge Rate is required.";
    if (!validateChargeRate(chargeRate))
      errors.chargeRate = "Charge Rate should be not more than 10.";
    if (!validateSubject(selectedSubjects))
      errors.selectedSubjects = "At least one subject must be selected";
    if (!validateArea(areaId)) errors.areaId = "Area is required";
    if (!validateBoard(selectedBoard))
      errors.selectedBoard = "Board is required"; // Validation for Board

    if (!image && !imagePrev) {
      errors.image = "Image is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutUs", aboutUs);
    formData.append("chargeRate", chargeRate);
    formData.append("subjectId", selectedSubjects.join(","));
    formData.append("areaId", areaId);
    formData.append("file", image);
    formData.append("board", selectedBoard?.value);

    try {
      dispatch(createTeacher(formData)).then(() => {
        dispatch(getAllTeachers());
      });
      handleSave();
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Failed to add teacher.");
    }
  };

  const handleEditTeacher = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutUs", aboutUs);
    formData.append("chargeRate", chargeRate);
    formData.append("subjectId", selectedSubjects.join(","));
    formData.append("areaId", areaId);
    if (image) {
      formData.append("file", image);
    }
    formData.append("board", selectedBoard?.value);

    try {
      dispatch(updateTeacherById(data._id, formData)).then(() => {
        dispatch(getAllTeachers());
      });
      handleSave();
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Failed to update teacher.");
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

  const handleAreaChange = (selectedOption) => {
    setAreaId(selectedOption ? selectedOption.value : "");
  };

  const columnsBoard = [
    "BSEB",
    "CBSE",
    "ICSE",
    "BSMEB",
    "All Board",
    "State Board",
    "IB",
    "Others",
  ];

  const boardOptions = columnsBoard.map((board) => ({
    label: board,
    value: board,
  }));

  return (
    <>
      {open && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content p-6 bg-white rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs">{formErrors.name}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs">{formErrors.email}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Phone</label>
                <Input
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter Phone"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs">{formErrors.phone}</p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium">Experience</label>
                <Input
                  value={aboutUs}
                  onChange={(e) => setAboutUs(e.target.value)}
                />
                {formErrors.aboutUs && (
                  <p className="text-red-500 text-xs">{formErrors.aboutUs}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Subjects</label>
                <div className="relative z-10">
                  <Select
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
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
                  {formErrors.selectedSubjects && (
                    <p className="text-red-500 text-xs">
                      {formErrors.selectedSubjects}
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
                  {formErrors.areaId && (
                    <p className="text-red-500 text-xs">{formErrors.areaId}</p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Board</label>
                <div className="relative">
                  <Select
                    value={selectedBoard}
                    onChange={setSelectedBoard} // Directly set the selected option
                    options={boardOptions} // Ensure this is defined inside the component
                    className="w-full border rounded-lg text-sm"
                    isClearable={true}
                  />
                  {formErrors.selectedBoard && (
                    <p className="text-red-500 text-xs">
                      {formErrors.selectedBoard}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Charge Rate</label>
                <Input
                  value={chargeRate}
                  onChange={(e) => setChargeRate(e.target.value)}
                  placeholder="Enter Charge Rate"
                />
                {formErrors.chargeRate && (
                  <p className="text-red-500 text-xs">
                    {formErrors.chargeRate}
                  </p>
                )}
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
                {imagePrev && <img src={imagePrev} alt="Preview" width="150" />}
                {formErrors.image && (
                  <p className="text-red-500 text-xs">{formErrors.image}</p>
                )}
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
                onClick={isEditing ? handleEditTeacher : handleSubmit}
              >
                {isEditing ? "Save Changes" : "Add Teacher"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOpenTeacher;
