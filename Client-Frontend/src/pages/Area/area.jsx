import React, { useState, useEffect } from "react";
import { useAreaData } from "../../hook/areaData.js";
import AreaRow from "../../components/area/AreaTableRow.jsx";
import ModalOpenArea from "../../components/area/ModalOpenArea.jsx";
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
import { PencilIcon, ToggleLeft, ToggleRight, TrashIcon } from "lucide-react";

const TABLE_HEAD = ["Area Name", "Status", "Created", "Action"];

const sortKeyMap = {
  "Area Name": "name",
  Status: "isLive",
  Created: "createdAt",
};

function AreaTable() {
  const { areas, addArea, updateAreaById, deleteAreaById, toggleLiveStatus } =
    useAreaData();
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
    isLive: true,
    cityId: [],
  });
  const [editingId, setEditingId] = useState(null);

  const filteredRows = tableRows.filter((area) => {
    const searchLower = searchTerm.toLowerCase();

    // Check if the name contains the search term
    const nameMatch =
      area.name && area.name.toLowerCase().includes(searchLower);

    // Check if the search term is found in the date (createdAt field)
    const createdAtMatch = area.createdAt
      ? new Date(area.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower)
      : false;

    return nameMatch || createdAtMatch;
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const rowsPerPage = 6;

  useEffect(() => {
    if (areas) {
      setTableRows(areas);
    }
  }, [areas]);

  const sortedRows = [...filteredRows].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

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
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleSort = (column) => {
    const key = sortKeyMap[column];
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleOpenModal = (area = null) => {
    if (area) {
      setFormData({
        name: area.name,
        isLive: area.isLive,
        cityId: area.cityId,
      });
      setEditingId(area._id);
    } else {
      setFormData({
        name: "",
        isLive: true,
        cityId: [],
      });
      setEditingId(null);
    }

    setIsModalOpen(true);
  };

  const handleSaveArea = () => {
    const updatedArea = {
      name: formData.name,
      isLive: formData.isLive,
      cityId: formData.cityId,
      _id: editingId,
    };

    if (editingId) {
      updateAreaById(editingId, updatedArea);
    } else {
      addArea(updatedArea);
    }

    setIsModalOpen(false);
  };

  const handleDeleteArea = (id) => {
    deleteAreaById(id);
    setTableRows((prevRows) => prevRows.filter((area) => area._id !== id));
    setIsConfirmationOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleToggleLiveStatus = (id) => {
    toggleLiveStatus(id);
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
      <Card className="h-full w-full ">
        <CardHeader floated={false} className=" p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <Typography variant="h5">Area List</Typography>
              <Typography color="gray" className="mt-1 text-sm">
                Manage and view area information
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 bg-blue-600 text-white"
                size="sm"
                onClick={() => handleOpenModal()}
              >
                <UserPlusIcon className="h-4 w-4" /> Add Area
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
                </tr>
              </thead>
              <tbody>
                {currentRows.map((area) => (
                  <tr key={area._id} className="hover:bg-gray-50">
                    <td className="p-3 text-left w-72">
                      <strong>{area.name || "No name provided"}</strong>
                    </td>

                    <td className="p-3 text-left w-72">
                      <strong>{area.isLive ? "Active" : "Inactive"}</strong>
                      <span onClick={() => handleToggleLiveStatus(area._id)}>
                        {area.isLive ? (
                          <ToggleRight className="text-blue-600 cursor-pointer" />
                        ) : (
                          <ToggleLeft className="text-black cursor-pointer" />
                        )}
                      </span>
                    </td>

                    <td className="p-3 text-left w-72">
                      <strong>
                        {new Date(area.createdAt).toLocaleDateString()}
                      </strong>
                    </td>

                    <td className="p-3  flex gap-2 text-decoration-line: none;">
                      <Button
                        className="flex items-center gap-2 text-black hover:bg-blue-600 hover:text-white"
                        size="sm"
                        onClick={() => handleOpenModal(area)}
                      >
                        <PencilIcon className="h-5 w-5 " />
                      </Button>

                      <Button
                        className="flex items-center gap-2 text-red-600 hover:bg-red-600 hover:text-white"
                        size="sm"
                        onClick={() => openConfirmationDialog(area._id)}
                      >
                        <TrashIcon className="h-5 w-5 " />
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

      <ModalOpenArea
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveArea}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />

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

export default AreaTable;
