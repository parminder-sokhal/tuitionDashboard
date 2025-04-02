import React, { useState, useEffect } from "react";
import { useFaqData } from "../../hook/faqData.js";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import ModalOpenFaq from "../../components/faq/ModalOpenFaq.jsx";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { PencilIcon, ToggleLeft, ToggleRight, TrashIcon } from "lucide-react";

const TABLE_HEAD = ["Question", "Answer", "Status", "Action"];

const sortKeyMap = {
  Question: "question",
  Answer: "answer",
  Status: "isLive",
};

function FaqTable() {
  const { faqs, addFaq, updateFaqById, deleteFaqById, toggleLiveStatus } =
    useFaqData();
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "question",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    isLive: true,
  });
  const [editingId, setEditingId] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const filteredRows = tableRows.filter((faq) => {
    const searchLower = searchTerm.toLowerCase();
    const questionMatch =
      faq.question && faq.question.toLowerCase().includes(searchLower);
    const answerMatch =
      faq.answer && faq.answer.toLowerCase().includes(searchLower);

    return questionMatch || answerMatch;
  });

  const rowsPerPage = import.meta.env.VITE_ROW_PER_PAGE;

  useEffect(() => {
    if (faqs) {
      setTableRows(faqs);
    }
  }, [faqs]);

  const sortedRows = [...filteredRows].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

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

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setFormData({
        question: faq.question,
        isLive: faq.isLive,
        answer: faq.answer,
      });
      setEditingId(faq._id);
    } else {
      setFormData({
        question: "",
        answer: "",
        isLive: true,
      });
      setEditingId(null);
    }

    setIsModalOpen(true);
  };

  const handleSaveFaq = () => {
    const updatedFaq = {
      question: formData.question,
      answer: formData.answer,
      isLive: formData.isLive,
      _id: editingId,
    };

    if (editingId) {
      updateFaqById(editingId, updatedFaq);
    } else {
      addFaq(updatedFaq);
    }

    setIsModalOpen(false);
  };

  const handleDeleteFaq = (id) => {
    deleteFaqById(id);
    setTableRows((prevRows) => prevRows.filter((faq) => faq._id !== id));
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

  const handleToggleLiveStatus = (id) => {
    toggleLiveStatus(id);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} className=" p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <Typography variant="h5">FAQ List</Typography>
              <Typography color="gray" className="mt-1 text-sm">
                Manage and view FAQ information
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 bg-blue-600 text-white"
                size="sm"
                onClick={() => handleOpenModal()}
              >
                <UserPlusIcon className="h-4 w-4" /> Add FAQ
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
                {currentRows.map((faq) => (
                  <tr key={faq._id} className="hover:bg-gray-50">
                    <td className="p-3 text-left">
                      <strong>{faq.question || "No question provided"}</strong>
                    </td>
                    <td className="p-3 text-left">
                      <strong>{faq.answer || "No answer provided"}</strong>
                    </td>
                    <td className="p-3 text-left">
                      <strong>{faq.isLive ? "Active" : "Inactive"}</strong>
                      <span onClick={() => handleToggleLiveStatus(faq._id)}>
                        {faq.isLive ? (
                          <ToggleRight className="text-blue-600 cursor-pointer" />
                        ) : (
                          <ToggleLeft className="text-black cursor-pointer" />
                        )}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2 text-decoration-line: none;">
                      <Button
                        className="flex items-center gap-2 text-black hover:bg-blue-600 hover:text-white"
                        size="sm"
                        onClick={() => handleOpenModal(faq)}
                      >
                        <PencilIcon className="h-5 w-5 " />
                      </Button>

                      <Button
                        className="flex items-center gap-2 text-red-600 hover:bg-red-600 hover:text-white"
                        size="sm"
                        onClick={() => openConfirmationDialog(faq._id)}
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

      <ModalOpenFaq
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveFaq}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative ">
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
                  onClick={() => {
                    handleDeleteFaq(subjectToDelete);
                  }}
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

export default FaqTable;
