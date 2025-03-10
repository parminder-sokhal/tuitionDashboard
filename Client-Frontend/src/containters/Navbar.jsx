import {
  LayoutDashboard,
  Boxes,
  Package,
  Settings,
  LifeBuoy,
  BookText,
  BookPlus,
  LandPlot,
  BookCopy,
} from "lucide-react"; // Add all necessary imports
import { Link } from "react-router-dom"; // Import Link for routing

export default function Navbar() {
  return (
    <aside className="h-screen w-64">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="text-xl font-bold">Pinnacle Home Tuition</div>{" "}
        </div>
        <ul className="flex-1 px-3">
          <SidebarItem
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard"
            to="/"
          />
          <SidebarItem icon={<Boxes size={20} />} text="Students" to="/Student" />
          <SidebarItem
            icon={<Package size={20} />}
            text="Teacher"
            to="/teacher"
          />
          
          <SidebarItem icon={<BookText size={20} />} text="Forms" to="/forms" />
          <SidebarItem icon={<LandPlot size={20} />} text="Area" to="/area" />
          <SidebarItem icon={<BookCopy  size={20} />} text="Subject" to="/subject" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </ul>
      </nav>
    </aside>
  );
}

// SidebarItem Component
export function SidebarItem({ icon, text, to }) {
  return (
    <li className="relative flex flex-col items-start py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
      {to ? (
        <Link to={to} className="w-full block">
          <div className="flex items-center">
            {icon}
            <span className="ml-3">{text}</span>
          </div>
        </Link> // Wrap with Link if "to" is passed
      ) : (
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{text}</span>
        </div> // Otherwise just render the content normally
      )}
    </li>
  );
}
