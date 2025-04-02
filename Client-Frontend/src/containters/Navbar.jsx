import {
  Boxes,
  Package,
  BookText,
  LandPlot,
  BookCopy,
  TableOfContents,
  MessagesSquare,
  Users,
} from "lucide-react"; // Add all necessary imports
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation for routing

import logo from "../../public/pringlelogosvg.svg"

export default function Navbar() {
  const location = useLocation(); // Get the current route

  return (
    <aside className="h-screen w-64">
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img className="w-8" src={logo} alt="logo" />
          <div className="text-lg font-bold">Pringle Home Tuition</div>
        </div>
        <ul className="flex-1 px-3">
          <SidebarItem
            icon={<Boxes size={20} />}
            text="Student"
            to="/Student"
            active={location.pathname === "/Student"}
          />
          <SidebarItem
            icon={<Package size={20} />}
            text="Teacher"
            to="/teacher"
            active={location.pathname === "/teacher"}
          />
          <SidebarItem
            icon={<BookText size={20} />}
            text="Form"
            to="/forms"
            active={location.pathname === "/forms"}
          />
          <SidebarItem
            icon={<LandPlot size={20} />}
            text="Area"
            to="/area"
            active={location.pathname === "/area"}
          />
          <SidebarItem
            icon={<BookCopy size={20} />}
            text="Subject"
            to="/subject"
            active={location.pathname === "/subject"}
          />
          <SidebarItem
            icon={<TableOfContents size={20} />}
            text="FAQ's"
            to="/faq"
            active={location.pathname === "/faq"}
          />
          <SidebarItem
            icon={<MessagesSquare size={20} />}
            text="Student Feedback"
            to="/StudentFeedback"
            active={location.pathname === "/StudentFeedback"}
          />
          <SidebarItem
            icon={<MessagesSquare size={20} />}
            text="Teacher Feedback"
            to="/TeacherFeedback"
            active={location.pathname === "/TeacherFeedback"}
          />
          <SidebarItem
            icon={<Users size={20} />}
            text="Vacancy"
            to="/Vacancy"
            active={location.pathname === "/Vacancy"}
          />
          <hr className="my-3" />
        </ul>
      </nav>
    </aside>
  );
}

// SidebarItem Component
export function SidebarItem({ icon, text, to, active }) {
  return (
    <li
      className={`relative flex flex-col items-start py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-blue-500 text-white" : "text-gray-700"
      }`}
    >
      {to ? (
        <Link to={to} className="w-full block">
          <div className="flex items-center">
            {icon}
            <span className="ml-3">{text}</span>
          </div>
        </Link>
      ) : (
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{text}</span>
        </div>
      )}
    </li>
  );
}
