import Icon from "@mui/material/Icon";
import AdminDoctorList from "components/admin/AdminDoctorList";
import DoctorDashboard from "components/doctor/DoctorDashboard";
import PatientDashboard from "components/patient/PatientDashboard";

const homeRoutes = [
    {
        type: "collapse",
        name: "Strona Doktora",
        key: "doctor",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/doctor",
        component: <DoctorDashboard />,
    },
    {
        type: "collapse",
        name: "Strona Pacjenta",
        key: "patient",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/patient",
        component: <PatientDashboard />,
    },
    {
        type: "collapse",
        name: "Strona Administratora",
        key: "admin",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/admin/doctorlist",
        component: <AdminDoctorList />,
    },
];

export default homeRoutes;