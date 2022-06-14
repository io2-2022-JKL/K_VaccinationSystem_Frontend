import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import '../../models/User';
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";
import { Button, Table, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
import Loader from "react-loader";
import DoctorConfirmModal from './DoctorConfirmModal';

export default function DoctorUnconfirmed() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [visitsExist, setExist] = useState(true);

    const updateData = async () => {
        const instance = ApiConnection("/doctor/incomingAppointments/");
        const instancePatient = ApiConnection("/patient/info/");
        const instanceDoctor = ApiConnection("/doctor/info")
        const d = await instanceDoctor.get("/doctor/info/" + GetId())
        const c = await instancePatient.get("/patient/info/" + d.data.patientAccountId)
        setPatientData(c.data)
        const r = await instance.get("/doctor/incomingAppointments/" + GetId()).catch((error) =>{
            if(error.response.status === 404)
                setExist(false)
        })
        if ( typeof r !== 'undefined')
        {
            for (let i = 0; i < r.data.length; i++)
            {
                r.data[i].deleteButton = <Button onClick={()=>{handleCancellation(r.data[i].appointmentId)}}>Odowołaj</Button>
                r.data[i].confirmButton = <DoctorConfirmModal data={r.data[i]} f={updateData}/>
            }
            setTableData(r.data) 
        }
        setLoading(false)
    }

    useEffect(async () => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancellation = async (id) => {
        const instance = ApiConnection("/doctor/vaccinate/vaccinationDidNotHappen/") 
        await instance.post(
            "/doctor/vaccinate/vaccinationDidNotHappen/"+GetId()+"/"+id, {
            })
        updateData()
    }

    const tableColumns = [
        {Header: "Imię", accessor: "patientFirstName", width: "12%"},
        {Header: "Nazwisko", accessor: "patientLastName", width: "12%"},
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "15%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "15%"},
        {Header: "Data", accessor: "from", width: "20%"},
        {Header: "Zaszczepiono", accessor: "confirmButton", width: "15%"},
        {Header: "Nie zaszczepiono", accessor: "deleteButton", width: "15%"},
    ]

    const options = {
        wordWarp: true,
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <Box mb={10}/>
            <Header name={patientData.firstName + " " + patientData.lastName} position={"Doktor"}>
                <Box mt={5} mb={3}>
                    <Grid container spacing={1}>
                        {
                            visitsExist?
                                loading?
                                <Grid>
                                    <Loader /> 
                                </Grid> 
                                :
                                <Box mt={5} mb={3}>
                                    <DataTable table={{columns: tableColumns, rows: tableData}}/>
                                </Box>
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
                                    Nie masz wizyt
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </Box>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}