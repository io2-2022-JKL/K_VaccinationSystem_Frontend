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

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [visitsExist, setExist] = useState(true);

    useEffect(async () => {
        const instance = ApiConnection("/patient/appointments/incomingAppointments/");
        const instance2 = ApiConnection("/patient/info/");
        const p = await instance2.get("/patient/info/" + GetId())
        const patient = new Patient(p.data)
        setPatientData(patient)
        const r = await instance.get("/patient/appointments/incomingAppointments/" + GetId()).catch((error) =>{
            if(error.response.status === 404)
                setExist(false)
        })
        if ( typeof r !== 'undefined')
        {
            for( let i = 0; i < r.data.length; i++)
            {
                r.data[i].detailsButton = <PatientIncomingVisitModal data={r.data[i]}/>
            }
            setTableData(r.data)
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
            <Header name={patientData.getFirstName + " " + patientData.getLastName} position={"Pacjent"}>
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
                                    "Imie i Nazwisko": patientData.getFirstName + " " + patientData.getLastName,
                                    "Pesel": patientData.getPesel,
                                    "Data urodzenia": patientData.getDateOfBirth,
                                    "Email": patientData.getMail,
                                    "Numer telefonu": patientData.getPhoneNumber,
                                }}
                                action={{route: "", tooltip: "Edit Profile"}}
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