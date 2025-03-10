import React from "react";
import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const FormRow = ({ contact, onEdit }) => {
  const {
    _id,
    name,
    email,
    number,
    whatsappNumber,
    class: className,
    subjectList,
    timeslot,
    feeRange,
  } = contact;

  return (
    <tr key={_id} className="hover:bg-gray-50">
      <td className="p-3 border-b">
        <Typography variant="small" className="font-medium text-gray-800">
          {name}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {email}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {number}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {whatsappNumber}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {className}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {subjectList.join(", ")}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {timeslot}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {feeRange}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Tooltip content="Edit Form">
          <IconButton variant="text" onClick={() => onEdit(contact)}>
            <PencilIcon className="h-4 w-4 text-gray-600" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default FormRow;
