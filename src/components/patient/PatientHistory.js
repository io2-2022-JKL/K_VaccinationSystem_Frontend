import React, {useState} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
import '../../models/User';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Divider from "@mui/material/Divider";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";

export default function PatientDashboard() {

    const [history, setHistory] = useState([
        {
            Date: "10.02.2022",
            Vaccine: "covid",
            Completed: "tak"
        },
        {
            Date: "2.02.2002",
            Vaccine: "przeziębienie",
            Completed: "tak"
        },
        {
            Date: "1.02.2022",
            Vaccine: "przeziębienie",
            Completed: "nie"
        }
    ])

    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",

    })

    const tableColumns = [
        {Header: "Data", accessor: "Date", width: "25%"},
        {Header: "Szczepionka", accessor: "Vaccine", width: "50%"},
        {Header: "Odbyto", accessor: "Completed", width: "25%"},
    ]



    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.firstName + " " + patient.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: history}}/>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>


    )
}



