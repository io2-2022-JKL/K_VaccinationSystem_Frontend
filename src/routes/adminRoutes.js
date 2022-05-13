import Icon from "@mui/material/Icon";
import AdminDoctorList from "components/admin/AdminDoctorList";
import AdminPatientList from "components/admin/AdminPatientList";

const adminRoutes = [
    {
        type: "collapse",
        name: "Lista Doktorów",
        key: "doctorlist",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/admin/doctorlist",
        component: <AdminDoctorList />,
    },
    {
        type: "collapse",
        name: "Lista Pacjentów",
        key: "patientlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/admin/patientlist",
        component: <AdminPatientList />,
    },
];

export default adminRoutes;