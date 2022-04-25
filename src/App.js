// import {Route, Routes, useLocation} from "react-router-dom";
// import AdminDoctorList from "./components/admin/AdminDoctorList";
// import DoctorLoginPage from "./components/doctor/DoctorLoginPage";
// import AdminLayout from "./components/admin/layout/AdminLayout";
// import DoctorLayout from "./components/doctor/layout/DoctorLayout";
// import DoctorDashboard from "./components/doctor/DoctorDashboard";
// import DoctorAvailability from "./components/doctor/DoctorAvalibility";
// import DoctorPlanned from "./components/doctor/DoctorPlanned";
// import DoctorUnconfirmed from "./components/doctor/DoctorUnconfirmed";
// import DoctorHistory from "./components/doctor/DoctorHistory";
// import AdminPatientList from "./components/admin/AdminPatientList";
// import React from "react";
// import useLogin from "./logic/useLogin";
// import AdminLoginPage from "./components/admin/AdminLoginPage";
// import Home from "./components/Home";
// import PatientDashboard from "./components/patient/PatientDashboard";
// import PatientLayout from "./components/patient/layout/PatientLayout";
// import PatientCertifications from "./components/patient/PatientCertifications";
// import PatientHistory from "./components/patient/PatientHistory";
// import PatientPlanned from "./components/patient/PatientPlanned";
// import PatientSignup from "./components/patient/PatientSignup";
// import PatientVaccinationSignUp from "./components/patient/PatientVaccinationSignUp";
// import DataTable from "./components/DataTable";
// import { useState } from "react";
// import PatientLoginPage from "./components/patient/PatientLoginPage";
// import "./styles/global.css"
//
// function App() {
//
//     const {isLoggedIn} = useLogin();
//     const location = useLocation();
//     return (
//         <>
//             <Routes>
//                 <Route path="" element={<Home/>}/>
//                 {
//                     isLoggedIn(location.pathname) ?
//                         <Route path="admin" element={<AdminLayout/>}>
//                             <Route path="" element={<AdminPatientList/>}/>
//                             <Route path="doctors" element={<AdminDoctorList/>}/>
//                             <Route path="patients" element={<AdminPatientList/>}/>
//                         </Route> :
//                         <Route path="admin" element={<AdminLoginPage/>}/>
//                 }
//                 {
//                     isLoggedIn(location.pathname) ?
//                         <Route path="doctor" element={<DoctorLayout/>}>
//                             <Route path="" element={<DoctorDashboard/>}/>
//                             <Route path="availability" element={<DoctorAvailability/>}/>
//                             <Route path="planned" element={<DoctorPlanned/>}/>
//                             <Route path="annulment" element={<DoctorUnconfirmed/>}/>
//                             <Route path="history" element={<DoctorHistory/>}/>
//                         </Route> :
//                         <Route path="doctor" element={<DoctorLoginPage/>}/>
//                 }
//                 {
//                     isLoggedIn(location.pathname) ?
//                         <Route path={"patient"}>
//                             <Route path="" element={<PatientLayout content={<PatientDashboard/>}/>}/>
//                             <Route path="certifications" element={<PatientLayout content={<PatientCertifications/>}/>}/>
//                             <Route path="history" element={<PatientLayout content={<PatientHistory/>}/>}/>
//                             <Route path="planned" element={<PatientLayout content={<PatientPlanned/>}/>}/>
//                             <Route path="signup" element={<PatientLayout content={<PatientSignup/>}/>}/>
//                             <Route path="vaccination" element={<PatientLayout content={<PatientVaccinationSignUp/>}/>}/>
//                         </Route> :
//                         <Route path="patient" element={<PatientLoginPage/>}/>
//                 }
//             </Routes>
//         </>
//     );
// }
//
//
// export default App;


/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
//import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
//import themeDark from "assets/theme-dark";
//import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
//import rtlPlugin from "stylis-plugin-rtl";
//import { CacheProvider } from "@emotion/react";
//import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import authRoutes from "authRoutes";


// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        direction,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);
    const { pathname } = useLocation();


    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };


    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brand={(transparentSidenav) || whiteSidenav ? brandDark : brandWhite}
                        brandName="MiNI szczepienia"
                        routes={routes}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
                {getRoutes(authRoutes)}
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/logIn" />} />
            </Routes>
        </ThemeProvider>
    );
}