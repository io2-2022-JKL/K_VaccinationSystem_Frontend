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
import Button from "@mui/material/Button";
import Loader from "react-loader";
import { PatientIncomingVisitModal } from './PatientVisitModal';
import { Typography } from '@mui/material';

export default function PatientDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [visitsExist, setExist] = useState(true);

    const instance = ApiConnection("/patient/appointments/incomingAppointments/");

    useEffect(() => {
        updateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const updateData = async () => {
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
                r.data[i].button = <Button onClick={() => handleCancellation(r.data[i].appointmentId)} color={"error"}>Anuluj</Button>
                r.data[i].detailsButton = <PatientIncomingVisitModal data={r.data[i]}/>
            }
            setTableData(r.data)
            setLoading(false)
        }
    }

    const handleCancellation = async (id) => {
        const url = "/patient/appointments/incomingAppointments/cancelAppointments/" + GetId() + "/" + id
        await instance.delete(url)
        updateData()
    }

    const tableColumns = [
        {Header: "Wirus", accessor: "vaccineVirus", width: "10%"},
        {Header: "Centrum szczepień", accessor: "vaccinationCenterName", width: "20%"},
        {Header: "Misto", accessor: "vaccinationCenterCity", width: "15%"},
        {Header: "Ulica", accessor: "vaccinationCenterStreet", width: "15%"},
        {Header: "Data", accessor: "windowBegin", width: "20%"},
        {Header: "Szczegóły", accessor: "detailsButton", width: "10%"},
        {Header: "", accessor: "button", width: "10%"},
    ]



    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patientData.getFirstName + " " + patientData.getLastName} position={"Pacjent"}>
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
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}