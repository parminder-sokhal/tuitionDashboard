import React, { useState, useEffect } from "react";
import { useTeacherData } from "../../hook/teacherData.js";
import TeacherRow from "../../components/teacher/TeacherTableRow.jsx";
import ModalOpenTeacher from "../../components/teacher/ModalOpenTeacher.jsx";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Name",
  "Email",
  "Phone",
  "About Us",
  "Area",
  "Subject",
  "Charge Rate",
  "Image",
  "Action",
];


const sortKeyMap = {
  Name: "name",
  Subjects: "subject",
  Status: "isLive",
  Location: "city.name",
  Rate: "chargeRate",
  Joined: "createdAt",
};

function TeacherTable() {
  const teachers = useTeacherData();
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    chargeRate: 0,
    city: { name: "" },
    isLive: true,
  });
  const [editingId, setEditingId] = useState(null);

  const rowsPerPage = 6;

  useEffect(() => {
    if (teachers) {
      setTableRows(teachers);
    }
  }, [teachers]);

  // Improved search function
  const filteredRows = tableRows.filter((teacher) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      teacher.name.toLowerCase().includes(searchLower) ||
      teacher.subject.toLowerCase().includes(searchLower) ||
      teacher.city.name.toLowerCase().includes(searchLower) ||
      (teacher.area?.name || "").toLowerCase().includes(searchLower)
    );
  });

  // Enhanced sorting logic
  const sortedRows = [...filteredRows].sort((a, b) => {
    const getNestedValue = (obj, key) =>
      key.split(".").reduce((o, k) => (o || {})[k], obj);

    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleSort = (column) => {
    const key = sortKeyMap[column];
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleOpenModal = (teacher = null) => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        subject: teacher.subject,
        chargeRate: teacher.chargeRate,
        city: teacher.city,
        isLive: teacher.isLive,
      });
      setEditingId(teacher._id);
    } else {
      setFormData({
        name: "",
        subject: "",
        chargeRate: 0,
        city: { name: "" },
        isLive: true,
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSaveTeacher = () => {
    if (editingId) {
      setTableRows(
        tableRows.map((teacher) =>
          teacher._id === editingId ? { ...teacher, ...formData } : teacher
        )
      );
    } else {
      const newTeacher = {
        ...formData,
        _id: `temp-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      setTableRows([...tableRows, newTeacher]);
    }
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Card className="h-full w-full shadow-md">
        <CardHeader floated={false} className="border-b p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <Typography variant="h5">Teacher List</Typography>
              <Typography color="gray" className="mt-1 text-sm">
                Manage and view teacher information
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 bg-blue-600 text-white"
                size="sm"
                onClick={() => handleOpenModal()}
              >
                <UserPlusIcon className="h-4 w-4" /> Add Teacher
              </Button>
            </div>
          </div>
            {/* //Searching box */}
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
                      <ChevronUpDownIcon className="h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((teacher) => (
                <TeacherRow
                  key={teacher._id}
                  teacher={teacher}
                  onEdit={() => handleOpenModal(teacher)}
                />
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

      <ModalOpenTeacher
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveTeacher}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />
    </>
  );
}

export default TeacherTable;
