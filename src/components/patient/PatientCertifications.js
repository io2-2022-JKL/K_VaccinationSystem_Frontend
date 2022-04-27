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
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

export default function PatientDashboard() {

    const [certs, setCerts] = useState([
        {
            Vaccine: "covid",
            from: "11.04.2022",
            to: "11.05.2022",
            download: <Button variant="contained" color={"success"}>Pobierz</Button>,
        },
        {
            Vaccine: "grypa",
            from: "10.04.2022",
            to: "10.04.2122",
            download: <Button variant="contained" color={"success"}>Pobierz</Button>,
        },
        {
            Vaccine: "świńska grypa",
            from: "6.10.2010",
            to: "27.12.2024",
            download: <Button variant="contained" color={"success"}>Pobierz</Button>,
        }
    ]);

    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",

    })

    const tableColumns = [
        {Header: "Szczepionka", accessor: "Vaccine", width: "25%"},
        {Header: "Od", accessor: "from", width: "25%"},
        {Header: "Do", accessor: "to", width: "25%"},
        {Header: "", accessor: "download", width: "25%"},
    ]



    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.firstName + " " + patient.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: certs}}/>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}