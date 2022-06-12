import Icon from "@mui/material/Icon";
import DoctorAvailability from "components/doctor/DoctorAvalibility";
import DoctorDashboard from "components/doctor/DoctorDashboard";
import DoctorHistory from "components/doctor/DoctorHistory";
import DoctorUnconfirmed from "components/doctor/DoctorUnconfirmed";

const doctorRoutes = [
    {
        name: "Moje konto",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/doctor/",
        component: <DoctorDashboard />,
    },
    {
        type: "collapse",
        name: "Historia",
        key: "history",
        icon: <Icon fontSize="small">history</Icon>,
        route: "/doctor/history",
        component: <DoctorHistory />,
    },
    {
        type: "collapse",
        name: "Dostępność",
        key: "availability",
        icon: <Icon fontSize="small">event_available_rounded_icon</Icon>,
        route: "/doctor/availability",
        component: <DoctorAvailability />,
    },
    {
        type: "collapse",
        name: "Szczepienia",
        key: "vaccinations",
        icon: <Icon fontSize="small">assignment_ind_icon</Icon>,
        route: "/doctor/vaccinations",
        component: <DoctorUnconfirmed />,
    },
];

export default doctorRoutes;