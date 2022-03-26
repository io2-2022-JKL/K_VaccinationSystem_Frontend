import { Link, Route, Routes } from "react-router-dom";
import { AdminPage } from "./admin/AdminPage";
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { DoctorPage } from "./doctor/DoctorPage";
import { DoctorLoginPage } from "./doctor/DoctorLoginPage";
import { PatientPage } from "./patient/PatientPage";
import { PatientLoginPage } from "./patient/PatientLoginPage";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
      <Route path="/doctor/login" element={<DoctorLoginPage />} />
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