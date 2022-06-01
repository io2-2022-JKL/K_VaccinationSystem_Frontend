import Doctor from 'models/Doctor';
import '../../models/User';
import React, {useEffect, useState} from 'react';
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

export default function DoctorDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);

    useEffect(async () => {
        const instance = ApiConnection("/doctor/incomingAppointments/");
        const instancePatient = ApiConnection("/patient/info/");
        const instanceDoctor = ApiConnection("/doctor/info")
        const c = await instancePatient.get("/patient/info/" + GetId())
        console.log(c.data)
        setPatientData(c.data)
        const r = await instance.get("/doctor/incomingAppointments/" + GetId())
        setTableData(r.data)
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tableColumns = [
        {Header: "Imię", accessor: "patientFirstName", width: "13%"},
        {Header: "Nazwisko", accessor: "patientLastName", width: "15%"},
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "20%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "20%"},
        {Header: "Dawka", accessor: "whichVaccineDose", width: "12%"},
        {Header: "Data", accessor: "from", width: "20%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patientData.firstName + " " + patientData.lastName} position={"Doktor"}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} xl={4} sx={{display: "flex"}}>
                            <Divider orientation="vertical" sx={{ml: -2, mr: 1}}/>
                            <ProfileInfoCard
                                title="Informacje o doktorze"
                                description=""
                                info={{
                                    "Imie i Nazwisko": patientData.firstName + " " + patientData.lastName,
                                    "Pesel": patientData.pesel,
                                    "Data urodzenia": patientData.dateOfBirth,
                                    Email: patientData.mail,
                                }}
                                social={[]}
                                action={{route: "", tooltip: "Edit Profile"}}
                                shadow={false}
                            />
                            <Divider orientation="vertical" sx={{mx: 0}}/>
                        </Grid>
                        {
                            loading ?
                                <Grid item xs={12} xl={8}>Loading</Grid> :
                                <Grid item xs={12} xl={8}>
                                    <DataTable table={{columns: tableColumns, rows: tableData}}/>
                                </Grid>
                        }
                    </Grid>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}