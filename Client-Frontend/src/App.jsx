import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./containters/Navbar";
import StudentTable from "./pages/student/studentTable.jsx";
import TeacherTable from "./pages/Teacher/TeacherTable.jsx";
import FormsTable from "./pages/Forms/Forms";
import AreaTable from "./pages/Area/area";
import Subject from "./pages/Subject/Subject.jsx";
import FAQS from "./pages/Faq/faq";
import StudentFeedback from "./pages/student/studentFeedback.jsx";
import TeacherFeedback from "./pages/Teacher/teacherFeedback.jsx";
import Vacancy from "./pages/vacancy/VacancyTable.jsx";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/forms" replace />} />
            <Route path="/student" element={<StudentTable />} />
            <Route path="/teacher" element={<TeacherTable />} />
            <Route path="/forms" element={<FormsTable />} />
            <Route path="/area" element={<AreaTable />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/faq" element={<FAQS />} />
            <Route path="/StudentFeedback" element={<StudentFeedback />} />
            <Route path="/TeacherFeedback" element={<TeacherFeedback />} />
            <Route path="/vacancy" element={<Vacancy />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
