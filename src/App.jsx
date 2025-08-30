import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Users from "./pages/Users";
import AddAppointments from "./pages/AddAppointments";
import AddUser from "./pages/AddUser";
import VisitTypes from "./pages/VisitTypes";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-blue-500 text-white flex gap-4">
        <Link to="/">Appointments</Link>
        <Link to="/users">Users</Link>
        <Link to="/roles">Roles</Link>
        <Link to="/status">Status</Link>
        <Link to="/visittypes">Visit Types</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Appointments />} />
        <Route path="/users" element={<Users />} />
        <Route path="/addappointment" element={<AddAppointments />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/visittypes" element={<VisitTypes />} />
        {/* Add Users, Roles, Status pages here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;