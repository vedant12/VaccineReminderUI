import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Users from "./pages/Users";
import AddAppointments from "./pages/AddAppointments";
import AddUser from "./pages/AddUser";
import HomePage from "./pages/HomePage";
import VisitTypes from "./pages/VisitTypes";
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import oktaConfig from "../oktaConfig";
import { useNavigate } from "react-router-dom";
import NavBar from "./pages/NavBar";
import ProtectedRoutes from "../ProtectedRoutes";
import Footer from "./components/Footer";
import AddVisitType from "./pages/AddVisitType";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {

  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || '/');
  };

  return (
    <>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={
            <ProtectedRoutes>
              <Appointments />
            </ProtectedRoutes>}
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addappointment"
            element={
              <ProtectedRoutes>
                <AddAppointments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adduser"
            element={
              <ProtectedRoutes>
                <AddUser />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/visittypes"
            element={
              <ProtectedRoutes>
                <VisitTypes />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addvisittypes"
            element={
              <ProtectedRoutes>
                <AddVisitType />
              </ProtectedRoutes>
            }
          />
          {/* Okta login callback route */}
          <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>

      <Footer />
    </>
  );
}

export default App;