import React, {useEffect, useState} from 'react';
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
import ApiConnection from "../../logic/api/ApiConnection";
import useLogin from "../../logic/useLogin";
import Loader from "react-loader";
import { PatientIncomingVisitModal } from './PatientVisitModal';
import { Typography } from '@mui/material';

export default function PatientDashboard() {

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "25%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "25%"},
        {Header: "Data", accessor: "windowBegin", width: "25%"},
        {Header: "Szczegóły", accessor: "detailsButton", width: "25%"},
    ]

    const {GetId, LogOut} = useLogin();
    const {isLoggedIn} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [visitsExist, setExist] = useState(true);

    useEffect(async () => {
        const instance = ApiConnection("/patient/appointments/incomingAppointments/");
        const instance2 = ApiConnection("/patient/info/");
        let id = GetId()
        if(isLoggedIn("/doctor"))
        {
            const instanceDoctor = ApiConnection("/doctor/info")
            const d = await instanceDoctor.get("doctor/info/" + GetId())
            id = d.data.patientAccountId;
        }
        const p = await instance2.get("/patient/info/" + id).catch((error) => {
            if(error.response.status === 401)
                LogOut()
          })
        const patient = new Patient(p.data)
        setPatientData(patient.toTableData())
        const v = await instance.get("/patient/appointments/incomingAppointments/" + id).catch((error) =>{
            if(error.response.status === 404)
                setExist(false)
        })
        if ( typeof v !== 'undefined')
        {
            for( let i = 0; i < v.data.length; i++)
            {
                v.data[i].detailsButton = <PatientIncomingVisitModal data={v.data[i]}/>
            }
            setTableData(v.data)
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            {
                loading?
                <Loader/>:
            <Header name={patientData.firstName + " " + patientData.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} xl={4} sx={{display: "flex"}}>
                            <Divider orientation="vertical" sx={{ml: -2, mr: 1}}/>
                            {
                                loading?
                                    <Loader/>:
                            <ProfileInfoCard
                                title="Informacje o pacjencie"
                                description=""
                                info={{
                                    "Imie i Nazwisko": patientData.firstName + " " + patientData.lastName,
                                    "Pesel": patientData.PESEL,
                                    "Data urodzenia": patientData.dateOfBirth,
                                    "Email": patientData.mail,
                                    "Numer telefonu": patientData.phoneNumber,
                                }}
                                shadow={false}
                            />
                            }
                            <Divider orientation="vertical" sx={{mx: 0}}/>
                        </Grid>
                        {
                            visitsExist?
                                loading?
                                <Grid>
                                    <Loader /> 
                                </Grid> 
                                :
                                    <MDBox mt={5} mb={3}>
                                        <DataTable table={{columns: tableColumns, rows: tableData}}/>
                                    </MDBox>
                            :
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignContent="center"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: 30 }}>
                                <Typography>
                                    Nie masz żadnych nadchodzących wizyt
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </MDBox>
            </Header>
            }
            <Footer/>
        </DashboardLayout>
    )
}