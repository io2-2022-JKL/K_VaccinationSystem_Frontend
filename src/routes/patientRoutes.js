// @mui icons
import Icon from "@mui/material/Icon";
import PatientCertifications from "../components/patient/PatientCertifications";
import PatientHistory from "../components/patient/PatientHistory";
import PatientPlanned from "../components/patient/PatientPlanned";
import PatientSignup from "../components/patient/PatientSignup";
import PatientDashboard from "../components/patient/PatientDashboard";

const routes = [
  {
    type: "collapse",
    name: "Moje konto",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/patient",
    component: <PatientDashboard />,
  },
  {
    type: "collapse",
    name: "Certyfikaty",
    key: "certyfications",
    icon: <Icon fontSize="small">history_edu_icon</Icon>,
    route: "/patient/certifications",
    component: <PatientCertifications />,
  },
  {
    type: "collapse",
    name: "Historia",
    key: "history",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/patient/history",
    component: <PatientHistory />,
  },
  {
    type: "collapse",
    name: "Zaplanowane",
    key: "planned",
    icon: <Icon fontSize="small">assignment_ind_icon</Icon>,
    route: "/patient/planned",
    component: <PatientPlanned />,
  },
  {
    type: "collapse",
    name: "Zapisz się",
    key: "signup",
    icon: <Icon fontSize="small">check_rounded_icon</Icon>,
    route: "/patient/vaccination",
    component: <PatientSignup />,
  },
];

export default routes;
