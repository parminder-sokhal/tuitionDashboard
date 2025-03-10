import React from "react";
import {
  Chip,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types"; // Import PropTypes

const TeacherRow = ({ teacher, onEdit }) => {
  const { _id, name, email, phone, aboutUs, area, subject, chargeRate, image } =
    teacher;

  const numericChargeRate =
    typeof chargeRate === "string" ? parseFloat(chargeRate) : chargeRate;
  const displaySubject = Array.isArray(subject)
    ? subject.map((sub) => sub.name).join(", ") // Extract the 'name' field and join
    : subject;


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
          {phone}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {aboutUs}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {area?.name || "-"}
        </Typography>
      </td>
      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          {displaySubject}
        </Typography>
      </td>

      <td className="p-3 border-b">
        <Typography variant="small" className="text-gray-600">
          ₹{numericChargeRate}/hr{" "}
        </Typography>
      </td>
      <td className="p-3 border-b">
        {image?.url ? (
          <img
            src={image.url} // Use the `url` property of the image object
            alt="Teacher Image"
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        )}
      </td>
      <td className="p-3 border-b">
        <Tooltip content="Edit Teacher">
          <IconButton variant="text" onClick={() => onEdit(teacher)}>
            <PencilIcon className="h-4 w-4 text-gray-600" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

TeacherRow.propTypes = {
  teacher: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    aboutUs: PropTypes.string.isRequired,
    area: PropTypes.object,
    subject: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ),
    ]).isRequired,
    chargeRate: PropTypes.oneOfType([
      PropTypes.number, // number type
      PropTypes.string, // string type
    ]).isRequired,
    image: PropTypes.shape({
      public_id: PropTypes.string,
      url: PropTypes.string, // Update image prop to an object with `url`
    }),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TeacherRow;
