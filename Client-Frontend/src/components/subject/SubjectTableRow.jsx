import React from "react";
import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const SubjectRow = ({ subject, onEdit }) => {
  const { _id, name, isLive } = subject;

  return (
    <tr key={_id} className="hover:bg-gray-50">
      <td className="p-3 border-b">
        <Typography variant="small" className="font-medium text-gray-800">
          {name}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {isLive ? "Active" : "Inactive"}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Tooltip content="Edit Subject">
          <IconButton 
            variant="text" 
            onClick={() => onEdit(subject)} 
            className="cursor-pointer" // Adding cursor pointer for better UX
          >
            <PencilIcon className="h-4 w-4 text-gray-600" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default SubjectRow;
