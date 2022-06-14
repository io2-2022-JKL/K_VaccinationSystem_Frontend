import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import '../../models/User';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";
import { Typography } from '@mui/material';
import Loader from "react-loader";
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material';

export default function DoctorDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const [patientData, setPatientData] = useState([])
    const [visitsExist, setExist] = useState(true)
    const [openAdd, setOpenAdd] = useState(false);
    const handleAddSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAdd(false);
    };
    const actionAdd = (
        <>
            <IconButton
                size="small"
                color="inherit"
                onClick={handleAddSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
      );

    const updateData = async () => {
        const instance = ApiConnection("/doctor/formerAppointments/");
        const instancePatient = ApiConnection("/patient/info/");
        const instanceDoctor = ApiConnection("/doctor/info")
        const d = await instanceDoctor.get("/doctor/info/" + GetId())
        const c = await instancePatient.get("/patient/info/" + d.data.patientAccountId)
        setPatientData(c.data)
        const r = await instance.get("/doctor/formerAppointments/" + GetId()).catch((error) =>{
            if(error.response.status === 404)
                setExist(false)
        })
        if ( typeof r !== 'undefined')
        {
            for (let i = 0; i < r.data.length; i++)
            {
                if(r.data[i].state === 'Finished') r.data[i].certifyButton = <Button onClick={()=>{handleCertification(r.data[i].appointmentId)}}>Certyfikuj</Button>
                if(r.data[i].state === 'Cancelled') r.data[i].batchNumber = ""
            }
            setTableData(r.data) 
        }
        setLoading(false)
    }

    useEffect(async () => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCertification = async (id) => {
        const instance = ApiConnection("/doctor/vaccinate/certify/") 
        await instance.post(
            "/doctor/vaccinate/certify/"+GetId()+"/"+id, {
            })
        updateData()
        setOpenAdd(true)
    }

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "15%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "10%"},
        {Header: "Dawka", accessor: "vaccineDose", width: "6%"},
        {Header: "Imię", accessor: "patientFirstName", width: "10%"},
        {Header: "Nazwisko", accessor: "patientLastName", width: "10%"},
        {Header: "Data", accessor: "from", width: "10%"},
        {Header: "Status", accessor: "state", width: "10%"},
        {Header: "Partia", accessor: "batchNumber", width: "10%"},
        {Header: "Certyfikuj", accessor: "certifyButton", width: "10%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patientData.firstName + " " + patientData.lastName} position={"Doktor"}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
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
                                    404 nie ma wizyt
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </MDBox>
                <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                action={actionAdd}
                severity="success"
            >
                <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
                   Certyfikat został wystawiony
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



