import React from 'react';
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

    var tmp = {};
    tmp.id = '1';
    tmp.pesel = '00000000001';
    tmp.firstName = 'Jakub';
    tmp.lastName = 'Nowak';
    tmp.dateOfBirth = '24-03-1999';
    tmp.mail = 'jakub.nowak@adres.mailowy.pl';
    tmp.phoneNumber = '+48000000000';
    tmp.vaccinationCount = '0';
    tmp.vaccinationHistory = 'todo';
    tmp.futureVaccinations = 'todo';
    tmp.certificates = 'todo';
    tmp.active = 'a';

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "name", width: "50%"},
        {Header: "Data", accessor: "date", width: "25%"},
        {Header: "Godzina", accessor: "hour", width: "25%"},
    ]

    const tableData = [
        {
            name: "Johnson&Johnson",
            date: "20-11-2022",
            hour: "10:40",
        },
        {
            name: "Johnson&Johnson",
            date: "20-11-2022",
            hour: "10:40",
        },
        {
            name: "Johnson&Johnson",
            date: "20-11-2022",
            hour: "10:40",
        },
        {
            name: "Johnson&Johnson",
            date: "20-11-2022",
            hour: "10:40",
        },
    ]


    const patient = new Patient(tmp);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.getFirstName + " " + patient.getLastName} position={"Patient"}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} xl={4} sx={{display: "flex"}}>
                            <Divider orientation="vertical" sx={{ml: -2, mr: 1}}/>
                            <ProfileInfoCard
                                title="Informacje o pacjencie"
                                description=""
                                info={{
                                    "Imie i Nazwisko": patient.getFirstName + " " + patient.getLastName,
                                    "Pesel": patient.getPesel,
                                    "Data urodzenia": patient.getDateOfBirth,
                                    Email: patient.getMail,
                                }}
                                social={[]}
                                action={{route: "", tooltip: "Edit Profile"}}
                                shadow={false}
                            />
                            <Divider orientation="vertical" sx={{mx: 0}}/>
                        </Grid>
                        <Grid item xs={12} xl={8}>
                            <DataTable table={{columns: tableColumns, rows: tableData}}/>
                        </Grid>
                    </Grid>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>


    )
}



