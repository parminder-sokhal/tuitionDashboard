import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Navbar from "./containters/Navbar"; 
import Home from "./containters/Home"; 
import EmployeeTable from "./containters/EmployeeTable";
import Student from "./pages/student/student";
import TeacherTable from "./pages/Teacher/Teacher"
import FormsTable from "./pages/Forms/Forms";
import AreaTable from "./pages/Area/area"; 
import SubjectTable from "./pages/Subject/Subject.jsx";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Navbar with Sidebar (static part) */}
        <Navbar />

        {/* Main content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/statistics-1" element={<EmployeeTable />} /> {/* Route for EmployeeTable */}
            <Route path="/student" element={<Student />} />
            <Route path="/teacher" element={<TeacherTable />} />
            <Route path="/forms" element={<FormsTable/>} />
            <Route path="/area" element={<AreaTable />} />
            <Route path="/subject" element={<SubjectTable/>}/>
            {/* Add more routes for other components as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
