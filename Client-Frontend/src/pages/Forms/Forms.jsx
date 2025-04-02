import React, { useState, useEffect } from "react";
import { useFormsData } from "../../hook/formsData.js";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { TrashIcon } from "lucide-react";

const TABLE_HEAD = [
  "Name",
  "Role",
  "Phone No",
  "Class",
  "Time/Fee Range",
  "Date",
];

const sortKeyMap = {
  Name: "name",
  Role: "role",
  "Phone No": "number",
  Class: "class",
  "Time/Fee Range": "timeslot",
  Date: "createdAt",
};

function FormsTable() {
  const { contacts, deleteAreaById } = useFormsData();
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    if (contacts) {
      setTableRows(contacts);
    }
  }, [contacts]);

  const filteredRows = tableRows.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (contact.name && contact.name.toLowerCase().includes(searchLower)) ||
      (contact.email && contact.email.toLowerCase().includes(searchLower)) ||
      (contact.number &&
        String(contact.number).toLowerCase().includes(searchLower)) ||
      (contact.whatsappNumber &&
        String(contact.whatsappNumber).toLowerCase().includes(searchLower)) ||
      (contact.class && contact.class.toLowerCase().includes(searchLower)) ||
      (contact.subjectList &&
        contact.subjectList.join("").toLowerCase().includes(searchLower)) ||
      (contact.timeslot &&
        contact.timeslot.toLowerCase().includes(searchLower)) ||
      (contact.feeRange &&
        contact.feeRange.toLowerCase().includes(searchLower)) ||
      (contact.role && contact.role.toLowerCase().includes(searchLower)) ||
      (contact.createdAt &&
        new Date(contact.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower))
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Sorting for createdAt (date)
    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    // Sorting for other fields (strings or numbers)
    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  const handleSort = (columnName) => {
    const key = sortKeyMap[columnName];
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleDeleteArea = (id) => {
    deleteAreaById(id);
    setTableRows((prevRows) =>
      prevRows.filter((contact) => contact._id !== id)
    );
    setIsConfirmationOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openConfirmationDialog = (id) => {
    setSubjectToDelete(id);
    setIsConfirmationOpen(true);
  };

  const closeConfirmationDialog = () => {
    setSubjectToDelete(null);
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Typography variant="h5">Form List</Typography>
          </div>
          <div className="relative mt-4 w-full md:w-72">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </CardHeader>

        <CardBody className="p-4">
          {tableRows.length === 0 ? (
            <div>No Data Found</div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="p-3 cursor-pointer"
                      onClick={() => handleSort(head)}
                    >
                      <div className="flex items-center gap-1">
                        {head}
                        {head !== "Action" && (
                          <ChevronUpDownIcon className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((contact) => (
                  <tr key={contact._id}>
                    <td className="p-3 text-left">
                      <strong>{contact.name || "No name provided"}</strong>
                      <br />
                      {contact.email || "No email provided"}
                    </td>
                    <td className="p-3 text-left">
                      <strong>{contact.role || "No role provided"}</strong>
                    </td>
                    <td className="p-3 text-left">
                      <strong>{contact.number || "No number provided"}</strong>
                      <br />
                      WhatsApp:{" "}
                      {contact.whatsappNumber || "No WhatsApp provided"}
                    </td>
                    <td className="p-3 text-left">
                      <strong>
                        Class: {contact.class || "No class provided"}
                      </strong>
                      <br />
                      Subjects:{" "}
                      {contact.subjectList.length > 0
                        ? contact.subjectList.join(", ")
                        : "No subjects provided"}
                    </td>
                    <td className="p-3 text-left">
                      <strong>
                        Time: {contact.timeslot || "No timeslot provided"}
                      </strong>
                      <br />
                      Charges: {contact.feeRange || "No fee range provided"}
                    </td>

                    <td className="p-3 text-left">
                      <strong>
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </strong>
                    </td>

                    <td className="p-3 text-left">
                      <Button
                        className="flex items-center gap-2 text-red-600 hover:bg-red-600 hover:text-white"
                        size="sm"
                        onClick={() => openConfirmationDialog(contact._id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    You will lose all of your data by deleting this. This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  onClick={() => handleDeleteArea(subjectToDelete)}
                >
                  Delete
                </button>
                <button
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                  onClick={closeConfirmationDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormsTable;
