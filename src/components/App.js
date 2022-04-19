import {Route, Routes, useLocation} from "react-router-dom";
import AdminDoctorList from "./admin/AdminDoctorList";
import DoctorLoginPage from "./doctor/DoctorLoginPage";
import AdminLayout from "./admin/layout/AdminLayout";
import DoctorLayout from "./doctor/layout/DoctorLayout";
import DoctorDashboard from "./doctor/DoctorDashboard";
import DoctorAvailability from "./doctor/DoctorAvalibility";
import DoctorPlanned from "./doctor/DoctorPlanned";
import DoctorUnconfirmed from "./doctor/DoctorUnconfirmed";
import DoctorHistory from "./doctor/DoctorHistory";
import AdminPatientList from "./admin/AdminPatientList";
import React from "react";
import useLogin from "../logic/useLogin";
import AdminLoginPage from "./admin/AdminLoginPage";
import Home from "./Home";
import PatientDashboard from "./patient/PatientDashboard";
import PatientLayout from "./patient/layout/PatientLayout";
import PatientCertifications from "./patient/PatientCertifications";
import PatientHistory from "./patient/PatientHistory";
import PatientPlanned from "./patient/PatientPlanned";
import PatientSignup from "./patient/PatientSignup";
import PatientVaccinationSignUp from "./patient/PatientVaccinationSignUp";
import DataTable from "./tableComponent/DataTable";
import { useState } from "react";
import PatientLoginPage from "./patient/PatientLoginPage";
import "../styles/global.css"

function App() {


    const {isLoggedIn} = useLogin();
    const location = useLocation();
    return (
            <Routes>
                <Route path="" element={<Home/>}/>
                {
                    isLoggedIn(location.pathname) ?
                        <Route path="admin" element={<AdminLayout/>}>
                            <Route path="" element={<AdminPatientList/>}/>
                            <Route path="doctors" element={<AdminDoctorList/>}/>
                            <Route path="patients" element={<AdminPatientList/>}/>
                        </Route> :
                        <Route path="admin" element={<AdminLoginPage/>}/>
                }
                {
                    isLoggedIn(location.pathname) ?
                        <Route path="doctor" element={<DoctorLayout/>}>
                            <Route path="" element={<DoctorDashboard/>}/>
                            <Route path="availability" element={<DoctorAvailability/>}/>
                            <Route path="planned" element={<DoctorPlanned/>}/>
                            <Route path="annulment" element={<DoctorUnconfirmed/>}/>
                            <Route path="history" element={<DoctorHistory/>}/>
                        </Route> :
                        <Route path="doctor" element={<DoctorLoginPage/>}/>
                }
                {
                    isLoggedIn(location.pathname) ?
                        <Route path={"patient"}>
                            <Route path="" element={<PatientLayout content={<PatientDashboard/>}/>}/>
                            <Route path="certifications" element={<PatientLayout content={<PatientCertifications/>}/>}/>
                            <Route path="history" element={<PatientLayout content={<PatientHistory/>}/>}/>
                            <Route path="planned" element={<PatientLayout content={<PatientPlanned/>}/>}/>
                            <Route path="signup" element={<PatientLayout content={<PatientSignup/>}/>}/>
                            <Route path="vaccination" element={<PatientLayout content={<PatientVaccinationSignUp/>}/>}/>
                        </Route> :
                        <Route path="patient" element={<PatientLoginPage/>}/>
                }
            </Routes>
    );
}


export default App;