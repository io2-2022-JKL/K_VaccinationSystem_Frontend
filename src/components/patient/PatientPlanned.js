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

    const [visits, setVisits] = useState([
        {
            Date: "12.04.2022",
            Hour: "13:10",
            Place: "Centrum Szczepień na Koszykowej",
            Vaccine: "Covid"
        },
        {
            Date: "15.04.2022",
            Hour: "12:00",
            Place: "Centrum 8",
            Vaccine: "losowa"
        }
    ])

    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",

    })

    const tableColumns = [
        {Header: "Data", accessor: "Date", width: "25%"},
        {Header: "Godzina", accessor: "Hour", width: "25%"},
        {Header: "Miejsce", accessor: "Place", width: "25%"},
        {Header: "Szczepionka", accessor: "Vaccine", width: "25%"},
    ]



    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.firstName + " " + patient.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: visits}}/>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}