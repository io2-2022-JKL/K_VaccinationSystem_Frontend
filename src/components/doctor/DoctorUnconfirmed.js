import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
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
import { Button, Typography } from '@mui/material';

import Loader from "react-loader";
import DoctorConfirmModal from './DoctorConfirmModal';

export default function DoctorUnconfirmed() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [visitsExist, setExist] = useState(true);

    useEffect(async () => {
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
                r.data[i].confirmButton = <DoctorConfirmModal data={r.data[i]}/>
            }
            setTableData(r.data) 
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancellation = async (id) => {
        const instance = ApiConnection("/doctor/vaccinate/vaccinationDidNotHappen/") 
        await instance.post(
            "/doctor/vaccinate/vaccinationDidNotHappen/"+GetId()+"/"+id, {
            })
        window.location.reload(false);
    }

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "20%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "20%"},
        {Header: "Data", accessor: "from", width: "20%"},
        {Header: "Zaszczepiono", accessor: "confirmButton", width: "20%"},
        {Header: "Nie zaszczepiono", accessor: "deleteButton", width: "20%"},
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
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



