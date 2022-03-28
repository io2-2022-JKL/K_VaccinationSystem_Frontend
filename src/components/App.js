import { Link, Route, Routes } from "react-router-dom";
import {AdminDoctorList, AdminPage} from "./admin/AdminDoctorList";
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { DoctorLoginPage } from "./doctor/DoctorLoginPage";
import { PatientLoginPage } from "./patient/PatientLoginPage";
import {AdminLayout} from "./admin/layout/AdminLayout";
import {DoctorLayout} from "./doctor/layout/DoctorLayout";
import {DoctorDashboard} from "./doctor/DoctorDashboard";
import {DoctorAvailability} from "./doctor/DoctorAvalibility";
import {DoctorPlanned} from "./doctor/DoctorPlanned";
import {DoctorUnconfirmed} from "./doctor/DoctorUnconfirmed";
import {DoctorHistory} from "./doctor/DoctorHistory";
import {PatientDashboard} from "./patient/PatientDashboard";
import {PatientCertifications} from "./patient/PatientCertifications";
import {PatientHistory} from "./patient/PatientHistory";
import {PatientPlanned} from "./patient/PatientPlanned";
import {PatientSignup} from "./patient/PatientSignup";
import {PatientLayout} from "./patient/layout/PatientLayout";
import {AdminPatientList} from "./admin/AdminPatientList";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLayout content={<AdminPatientList />} />} />
      <Route path="/admin/doctors" element={<AdminLayout content={<AdminDoctorList />} />} />
      <Route path="/admin/patients" element={<AdminLayout content={<AdminPatientList />} />} />
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
      <Route path="/patient" element={<PatientLayout content={<PatientDashboard />} />} />
      <Route path="/patient/dashboard" element={<PatientLayout content={<PatientDashboard />} />} />
      <Route path="/patient/certifications" element={<PatientLayout content={<PatientCertifications />} />} />
      <Route path="/patient/history" element={<PatientLayout content={<PatientHistory />} />} />
      <Route path="/patient/planned" element={<PatientLayout content={<PatientPlanned />} />} />
      <Route path="/patient/signup" element={<PatientLayout content={<PatientSignup />} />} />
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