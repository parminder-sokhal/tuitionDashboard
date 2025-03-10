import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const TABLE_HEAD = ["Name", "Department", "Phone", "Actions"];

const EmployeeTable = () => {
  const [rows, setRows] = useState([
    { name: "John Doe", department: "Administration", phone: "(171) 555-2222" },
    {
      name: "Peter Parker",
      department: "Customer Service",
      phone: "(313) 555-5735",
    },
    {
      name: "Fran Wilson",
      department: "Human Resources",
      phone: "(503) 555-9931",
    },
    {
      name: "Jane Smith",
      department: "Administration",
      phone: "(123) 555-4567",
    },
    {
      name: "Alice Johnson",
      department: "Customer Service",
      phone: "(456) 555-7890",
    },
    {
      name: "Bob Brown",
      department: "Human Resources",
      phone: "(789) 555-1234",
    },
    {
      name: "Bob Brown",
      department: "Human Resources",
      phone: "(789) 555-1234",
    },
    {
      name: "Bob Brown",
      department: "Human Resources",
      phone: "(789) 555-1234",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newRow, setNewRow] = useState({ name: "", department: "", phone: "" });

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.includes(searchTerm)
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleSort = (column) => {
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: column, direction });
  };

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setEditIndex(index);
      setNewRow(rows[index]);
    } else {
      setEditIndex(null);
      setNewRow({ name: "", department: "", phone: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveRow = () => {
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
    } else {
      setRows([...rows, newRow]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Card className="h-full w-full shadow-md">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none border-b p-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <Typography variant="h5" color="blue-gray">
                Employee Details
              </Typography>
              <Typography color="gray" className="mt-1 text-sm">
                Manage employee information here
              </Typography>
            </div>

            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                View All
              </Button>
              <Button
                className="flex items-center gap-2 bg-blue-600 text-white"
                size="sm"
                onClick={() => handleOpenModal()}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                Employee
              </Button>
            </div>

          </div>
          <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="relative w-full md:w-72">
              {/* Search Icon inside Input */}
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search employees..."
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto p-4">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="p-3 border-b cursor-pointer"
                    onClick={() => handleSort(head.toLowerCase())}
                  >
                    <Typography
                      variant="small"
                      className="flex items-center gap-2 font-medium text-gray-700"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3">{row.name}</td>
                  <td className="p-3">{row.department}</td>
                  <td className="p-3">{row.phone}</td>
                  <td className="p-3">
                    <Tooltip content="Edit">
                      <IconButton onClick={() => handleOpenModal(index)}>
                        <PencilIcon className="h-4 w-4 text-gray-600" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <IconButton onClick={() => handleDeleteRow(index)}>
                        <UserPlusIcon className="h-4 w-4 text-red-600" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small" className="text-gray-700">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modal for Add/Edit Employee */}
      {/* <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        //handler={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black bg-opacity-20" />
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col space-y-4 z-10">
          <DialogHeader className="text-center text-xl font-semibold text-gray-900">
            {editIndex !== null ? "Edit Employee" : "Add Employee"}
          </DialogHeader>

          <DialogBody className="flex flex-col space-y-4">
            <div>
              <Typography variant="small">Name</Typography>
              <Input
                value={newRow.name}
                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
                className="mt-2 w-full"
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small">Department</Typography>
              <Input
                value={newRow.department}
                onChange={(e) =>
                  setNewRow({ ...newRow, department: e.target.value })
                }
                className="mt-2 w-full"
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small">Phone</Typography>
              <Input
                value={newRow.phone}
                onChange={(e) =>
                  setNewRow({ ...newRow, phone: e.target.value })
                }
                className="mt-2 w-full"
                size="lg"
              />
            </div>
          </DialogBody>

          <DialogFooter className="flex justify-center space-x-2">
            <Button
              onClick={handleSaveRow}
              color="blue"
              size="sm"
              disabled={!newRow.name || !newRow.department || !newRow.phone}
            >
              Save
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              color="blue"
              size="sm"
            >
              Cancel
            </Button>
          </DialogFooter>
        </div>
      </Dialog> */}

{isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-center">Add Employee</h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block">Name</label>
                <input
                  type="text"
                  value={newRow.name}
                  onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block">Department</label>
                <input
                  type="text"
                  value={newRow.department}
                  onChange={(e) =>
                    setNewRow({ ...newRow, department: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block">Phone</label>
                <input
                  type="text"
                  value={newRow.phone}
                  onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSaveRow}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
