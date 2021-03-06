import Icon from "@mui/material/Icon";
import AdminDoctorList from "components/admin/AdminDoctorList";
import AdminPatientList from "components/admin/AdminPatientList";
import AdminVaccinationCenterList from "components/admin/AdminVaccinationCenterList";
import AdminVaccinesList from "components/admin/AdminVaccines";

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
    {
        type: "collapse",
        name: "Szczepionki",
        key: "vaccines",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/admin/vaccines",
        component: <AdminVaccinesList />,
    },
    {
        type: "collapse",
        name: "Centra szczepień",
        key: "vaccinationCenters",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/admin/vaccinationCenters",
        component: <AdminVaccinationCenterList />,
    },
];

export default adminRoutes;