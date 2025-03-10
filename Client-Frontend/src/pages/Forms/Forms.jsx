import React, { useState, useEffect } from "react";
import { useFormsData } from "../../hook/formsData.js";
import FormRow from "../../components/forms/FormTableRow.jsx";
import ModalOpenForm from "../../components/forms/ModalOpenForm.jsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Applicant",
  "Contacts",
  "Class/Subjects",
  "Time/Fee Range",
];

function FormsTable() {
  const forms = useFormsData();
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    whatsappNumber: "",
    class: "",
    subjectList: [],
    timeslot: "",
    feeRange: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (forms) {
      setTableRows(forms);
    }
  }, [forms]);

  const filteredRows = tableRows.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.number.toLowerCase().includes(searchLower) ||
      contact.whatsappNumber.toLowerCase().includes(searchLower) ||
      contact.class.toLowerCase().includes(searchLower) ||
      contact.subjectList.join("").toLowerCase().includes(searchLower) ||
      contact.timeslot.toLowerCase().includes(searchLower) ||
      contact.feeRange.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleOpenModal = (contact = null) => {
    if (contact) {
      setFormData(contact);
      setEditingId(contact._id);
    } else {
      setFormData({
        name: "",
        email: "",
        number: "",
        whatsappNumber: "",
        class: "",
        subjectList: [],
        timeslot: "",
        feeRange: "",
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSaveForm = () => {
    if (editingId) {
      setTableRows(
        tableRows.map((contact) =>
          contact._id === editingId ? { ...contact, ...formData } : contact
        )
      );
    } else {
      const newForm = {
        ...formData,
        _id: `temp-${Math.random().toString(36).substr(2, 9)}`,
      };
      setTableRows([...tableRows, newForm]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="h-full w-full shadow-md">
        <CardHeader floated={false} className="border-b p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Typography variant="h5">Form List</Typography>
            <Button
              className="flex items-center gap-2 bg-blue-600 text-white"
              size="sm"
              onClick={() => handleOpenModal()}
            >
              <UserPlusIcon className="h-4 w-4" /> Add Form
            </Button>
          </div>
          <div className="relative mt-4 w-full md:w-72">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </CardHeader>

        <CardBody className="p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-3 font-bold text-left">
                    {head}
                  </th>
                ))}
                <th className="p-3 text-left">Action</th>{""}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((contact) => (
                <tr key={contact._id} className="border-b">
                  <td className="p-3 text-left">
                    <strong>{contact.name || "No name provided"}</strong>
                    <br />
                    {contact.email || "No email provided"}
                  </td>
                  <td className="p-3 text-left">
                    <strong>{contact.number || "No number provided"}</strong>
                    <br />
                    WhatsApp: {contact.whatsappNumber || "No WhatsApp provided"}
                  </td>
                  <td className="p-3 text-left">
                    <strong>
                      Class:-{contact.class || "No class provided"}
                    </strong>
                    <br />
                    Subjects:-{""}
                    {contact.subjectList.length > 0
                      ? contact.subjectList.join(", ")
                      : "No subjects provided"}
                  </td>
                  <td className="p-3 text-left">
                    <strong>
                      Time:{contact.timeslot || "No timeslot provided"}
                    </strong>
                    <br />
                    Charges:{contact.feeRange || "No fee range provided"}
                  </td>
                  <td className="p-3 text-left">
                    <Button
                      className="flex items-center gap-2 text-black hover:bg-blue-600 hover:text-white"
                      size="sm"
                      onClick={() => handleOpenModal(contact)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ModalOpenForm
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveForm}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />
    </>
  );
}

export default FormsTable;
