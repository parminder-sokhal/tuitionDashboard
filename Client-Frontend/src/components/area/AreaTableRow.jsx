import React from "react";
import { Chip, Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const AreaRow = ({ area, onEdit }) => {
  const { _id, name, isLive, cityId, createdAt } = area;

  return (
    <tr key={_id} className="hover:bg-gray-50">
      <td className="p-3 border-b">
        <div className="flex flex-col">
          <Typography variant="small" className="font-medium text-gray-800">
            {name}
          </Typography>
        </div>
      </td>
      <td className="p-3 border-b">
        <Chip
          variant="ghost"
          size="sm"
          value={isLive ? "Online" : "Offline"}
          color={isLive ? "green" : "blue-gray"}
        />
      </td>
     
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-800">
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Tooltip content="Edit Area">
          <IconButton variant="text" onClick={() => onEdit(area)}>
            <PencilIcon className="h-4 w-4 text-gray-600" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default AreaRow;
