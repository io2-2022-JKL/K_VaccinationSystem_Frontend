import { Link, Route, Routes } from "react-router-dom";
import { AdminPage } from "./admin/AdminPage";
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { DoctorLoginPage } from "./doctor/DoctorLoginPage";
import { PatientPage } from "./patient/PatientPage";
import { PatientLoginPage } from "./patient/PatientLoginPage";
import {AdminLayout} from "./admin/layout/AdminLayout";
import {DoctorLayout} from "./doctor/layout/DoctorLayout";
import {DoctorDashboard} from "./doctor/DoctorDashboard";
import {DoctorAvailability} from "./doctor/DoctorAvalibility";
import {DoctorPlanned} from "./doctor/DoctorPlanned";
import {DoctorUnconfirmed} from "./doctor/DoctorUnconfirmed";
import {DoctorHistory} from "./doctor/DoctorHistory";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLayout content={<AdminPage />} />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* doctor */}
      <Route path="/doctor" element={<DoctorLayout content={<DoctorDashboard />} />} />
      <Route path="/doctor/dashboard" element={<DoctorLayout content={<DoctorDashboard />} />} />
      <Route path="/doctor/availability" element={<DoctorLayout content={<DoctorAvailability />} />} />
      <Route path="/doctor/planned" element={<DoctorLayout content={<DoctorPlanned />} />} />
      <Route path="/doctor/annulment" element={<DoctorLayout content={<DoctorUnconfirmed />} />} />
      <Route path="/doctor/history" element={<DoctorLayout content={<DoctorHistory />} />} />
      <Route path="/doctor/login" element={<DoctorLoginPage />} />

      {/* patient */}
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/patient/login" element={<PatientLoginPage />} />
    </Routes>
    </>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Strona startowa</h2>
      </main>
      <nav>
        <Link to="/admin">Strona admina</Link>
        <br/>
        <Link to="/patient">Strona pacjenta</Link>
        <br/>
        <Link to="/doctor">Strona lekarza</Link>
      </nav>
    </>
  )
}

export function isUserLoggedIn() {
  return true;
}

export default App;