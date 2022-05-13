import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Admin from '../../models/Admin'
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
import ApiConnection from "../../logic/api/ApiConnection";
import useLogin from "../../logic/useLogin";

export default function PatientDashboard() {

    let tmp = {};
    tmp.id = '1';
    tmp.pesel = '00000000001';
    tmp.firstName = 'Andrew';
    tmp.lastName = 'Bagpipe';
    tmp.dateOfBirth = '24-03-1999';
    tmp.mail = 'jakub.nowak@adres.mailowy.pl';
    tmp.phoneNumber = '+48000000000';
    tmp.vaccinationCount = '0';
    tmp.vaccinationHistory = 'todo';
    tmp.futureVaccinations = 'todo';
    tmp.certificates = 'todo';
    tmp.active = 'a';

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "50%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "25%"},
        {Header: "Data", accessor: "windowBegin", width: "25%"},
    ]

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);


    useEffect(() => {}, [])


    const patient = new Admin(tmp);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.getFirstName + " " + patient.getLastName} position={"Admin"}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} xl={4} sx={{display: "flex"}}>
                            <Divider orientation="vertical" sx={{ml: -2, mr: 1}}/>
                            <ProfileInfoCard
                                title="Informacje o użytkowniku"
                                description=""
                                info={{
                                    "Imie i Nazwisko": patient.getFirstName + " " + patient.getLastName,
                                    "Pesel": patient.getPesel,
                                    "Data urodzenia": patient.getDateOfBirth,
                                    "Email": patient.getMail,
                                }}
                                social={[]}
                                action={{route: "", tooltip: "Edit Profile"}}
                                shadow={false}
                            />
                            <Divider orientation="vertical" sx={{mx: 0}}/>
                        </Grid>
                    </Grid>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}