import Icon from "@mui/material/Icon";
import DoctorAvailability from "components/doctor/DoctorAvalibility";
import DoctorDashboard from "components/doctor/DoctorDashboard";
import DoctorHistory from "components/doctor/DoctorHistory";
import DoctorPlanned from "components/doctor/DoctorPlanned";
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
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/doctor/history",
        component: <DoctorHistory />,
    },
    {
        type: "collapse",
        name: "Dostępność",
        key: "availability",
        icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
        route: "/doctor/availability",
        component: <DoctorAvailability />,
    },
    {
        type: "collapse",
        name: "Zaplanowane",
        key: "planned",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/doctor/planned",
        component: <DoctorPlanned />,
    },
    {
        type: "collapse",
        name: "Niepotwierdzone",
        key: "unconfirmed",
        icon: <Icon fontSize="small">notifications</Icon>,
        route: "/doctor/unconfirmed",
        component: <DoctorUnconfirmed />,
    },
];

export default doctorRoutes;