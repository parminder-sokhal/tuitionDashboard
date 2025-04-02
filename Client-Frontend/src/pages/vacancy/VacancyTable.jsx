import React, { useState, useEffect } from "react";
import ModalOpenVacancy from "../../components/vacancy/ModalOpenVacancy"; // You would need to create this component for Vacancy modal
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { PencilIcon, ToggleLeft, ToggleRight, TrashIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVacancies,
  deleteVacancyById,
  updateVacancyLiveStatusById,
} from "../../redux/actions/vacancyActions"; // Assuming you have similar actions as teacher

const TABLE_HEAD = ["Student", "Area", "Subject", "Status", "Action"];

const sortKeyMap = {
  Student: "studentName",
  Area: "area.name",
  Subject: "subject.name",
  Status: "isLive",
};

function VacancyTable() {
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "studentName", // Default sorting key
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [data, setData] = useState("");

  const rowsPerPage = 6;

  const dispatch = useDispatch();
  const { vacancies } = useSelector((state) => state.vacancy);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllVacancies());
  }, [dispatch]);

  useEffect(() => {
    if (vacancies && Array.isArray(vacancies)) {
      setTableRows(vacancies);
    }
  }, [vacancies]);

  const filteredRows = tableRows.filter((vacancy) => {
    return (
      (vacancy.studentName &&
        vacancy.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vacancy.area?.name &&
        vacancy.area.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vacancy.subject?.name &&
        vacancy.subject.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    const getNestedValue = (obj, key) => {
      if (!obj || !key) return undefined;

      return key.split(".").reduce((o, k) => {
        if (o && o[k] !== undefined) {
          return o[k];
        }
        return undefined;
      }, obj);
    };

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

  const handleOpenModal = (vacancy = null) => {
    if (vacancy) {
      setData(vacancy);
      setEditingId(vacancy._id);
    } else {
      setData("");
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSaveVacancy = () => {
    setIsModalOpen(false);
  };

  const handleDeleteVacancy = (id) => {
    dispatch(deleteVacancyById(id)).then(() => {
      dispatch(getAllVacancies());
    });
    setIsConfirmationOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openConfirmationDialog = (id) => {
    setVacancyToDelete(id);
    setIsConfirmationOpen(true);
  };

  const closeConfirmationDialog = () => {
    setVacancyToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleToggleLiveStatus = (id) => {
    dispatch(updateVacancyLiveStatusById(id));
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <Typography variant="h5">Vacancy List</Typography>
              <Typography color="gray" className="mt-1 text-sm">
                Manage and view vacancy information
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 bg-blue-600 text-white"
                size="sm"
                onClick={() => handleOpenModal()}
              >
                <UserPlusIcon className="h-4 w-4" /> Add Vacancy
              </Button>
            </div>
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
                      className={`p-3 text-left text-sm font-medium 
                      ${
                        head !== "Action"
                          ? "cursor-pointer hover:bg-gray-200"
                          : "cursor-default"
                      }`}
                      onClick={
                        head !== "Action" ? () => handleSort(head) : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {head}
                        {head !== "Action" && (
                          <ChevronUpDownIcon className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((vacancy) => (
                    <tr key={vacancy._id}>
                      <td className="text-sm py-2 pl-2">
                        {vacancy.studentName}
                      </td>
                      <td className="text-sm py-2 pl-2">
                        {vacancy.area?.name || "Unknown"}
                      </td>
                      <td className="text-sm py-2 pl-2">
                        {vacancy.subject?.name || "No subject"}
                      </td>
                      <td className="text-sm py-2 pl-2">
                        <strong>
                          {vacancy.isLive ? "Active" : "Inactive"}
                        </strong>
                        <span
                          onClick={() => handleToggleLiveStatus(vacancy._id)}
                        >
                          {vacancy.isLive ? (
                            <ToggleRight className="text-blue-600 cursor-pointer" />
                          ) : (
                            <ToggleLeft className="text-black cursor-pointer" />
                          )}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <Button
                          className="flex items-center gap-2 text-black bg-white hover:bg-blue-600 hover:text-white"
                          onClick={() => handleOpenModal(vacancy)}
                          color="blue"
                          size="sm"
                        >
                          <PencilIcon className="h-5 w-5 " />
                        </Button>

                        <Button
                          className="flex items-center gap-2 text-red-600 bg-white hover:bg-red-600 hover:text-white"
                          onClick={() => openConfirmationDialog(vacancy._id)}
                          color="blue"
                          size="sm"
                        >
                          <TrashIcon className="h-5 w-5 " />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No vacancies available</td>
                  </tr>
                )}
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

      <ModalOpenVacancy
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveVacancy}
        data={data}
        isEditing={!!editingId}
      />

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
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
                  onClick={() => handleDeleteVacancy(vacancyToDelete)}
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

export default VacancyTable;
