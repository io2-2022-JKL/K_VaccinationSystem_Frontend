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
import DoctorAddTimeSlotsModal from './DoctorAddTimeSlotsModal';
import { Alert, Button } from '@mui/material';
import Loader from "react-loader";
import DoctorEditTimeSlotsModal from './DoctorEditTimeSlotModal';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function DoctorAvalibility() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [timeExist, setExist] = useState(true)
    const [open, setOpen] = useState(false);

    useEffect(async () => {
        updateData()
    }, [])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const action = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );

    const updateData = async () => {
        const instance = ApiConnection("/doctor/timeSlots/");
        const instancePatient = ApiConnection("/patient/info/");
        const instanceDoctor = ApiConnection("/doctor/info")
        const d = await instanceDoctor.get("/doctor/info/" + GetId())
        const c = await instancePatient.get("/patient/info/" + d.data.patientAccountId)
        setPatientData(c.data)
        const r = await instance.get("/doctor/timeSlots/" + GetId()).catch((error) =>{
            if(error.response.status === 404)
                setExist(false)
        })
        if ( typeof r !== 'undefined')
        {
            for (let i = 0; i < r.data.length; i++)
            {
                r.data[i].deleteButton = <Button onClick={() => handleCancellation(GetId(), r.data[i].id)} color={"error"}>Usuń</Button>
                r.data[i].editButton = <DoctorEditTimeSlotsModal data={r.data[i]} f={updateData}/>
            }
            setTableData(r.data)
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const handleCancellation = async (id, slotId) => {
        const deleteInstance = ApiConnection("/doctor/timeSlot/delete")
        setLoading(true)
        setExist(true)
        const url = "/doctor/timeSlot/delete/" + id
        await deleteInstance.post(
            url, {
                "slots": [slotId]
            }
        )
        updateData()
        setLoading(false)
    }

    const tableColumns = [
        {Header: "Od", accessor: "from", width: "25%"},
        {Header: "Do", accessor: "to", width: "25%"},
        {Header: "Edytuj", accessor: "editButton", width: "25%"},
        {Header: "Usuń", accessor: "deleteButton", width: "25%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patientData.firstName + " " + patientData.lastName} position={"Lekarz"}>
            {
                timeExist?
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
                            Nie ustawiłeś swojej dostępności. Kliknij poniżej, aby dodać terminy.
                        </Typography>
                    </Grid>
            }
            <DoctorAddTimeSlotsModal f={updateData} o={setOpen}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                action={action}
                severity="success"
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



