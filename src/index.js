import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/index.css';
import App from './components/App';
import store from './app/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import {AdminLayout} from "./components/admin/layout/AdminLayout";
import {DoctorLayout} from "./components/doctor/layout/DoctorLayout";
import {DoctorDashboard} from "./components/doctor/DoctorDashboard";
import {DoctorAvailability} from "./components/doctor/DoctorAvalibility";
import {DoctorPlanned} from "./components/doctor/DoctorPlanned";
import {DoctorUnconfirmed} from "./components/doctor/DoctorUnconfirmed";
import {DoctorHistory} from "./components/doctor/DoctorHistory";
import {DoctorLoginPage} from "./components/doctor/DoctorLoginPage";
import {PatientLayout} from "./components/patient/layout/PatientLayout";
import {PatientDashboard} from "./components/patient/PatientDashboard";
import {PatientCertifications} from "./components/patient/PatientCertifications";
import {PatientHistory} from "./components/patient/PatientHistory";
import {PatientPlanned} from "./components/patient/PatientPlanned";
import {PatientSignup} from "./components/patient/PatientSignup";
import {PatientLoginPage} from "./components/patient/PatientLoginPage";
import {AdminPatientList} from "./components/admin/AdminPatientList";
import {AdminDoctorList} from "./components/admin/AdminDoctorList";
import Home from "./components/Home";
import {AdminLoginPage} from "./components/admin/AdminLoginPage";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
