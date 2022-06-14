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
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(async () => {
        updateData()
    }, [])

    const handleAddSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAdd(false);
      };

    const handleEditSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenEdit(false);
      };

    const handleDeleteSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenDelete(false);
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

    const actionEdit = (
        <>
          <IconButton
            size="small"
            color="inherit"
            onClick={handleEditSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );

    const actionDelete = (
        <>
          <IconButton
            size="small"
            color="inherit"
            onClick={handleDeleteSnackbarClose}
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
                r.data[i].editButton = <DoctorEditTimeSlotsModal data={r.data[i]} f={updateData} o={setOpenEdit}/>
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
        const url = "/doctor/timeSlots/delete/" + id
        await deleteInstance.post(
            url, [{"id":slotId}]
        )
        updateData()
        setLoading(false)
        setOpenDelete(true)
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
            <DoctorAddTimeSlotsModal f={updateData} o={setOpenAdd}/>
            <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                action={actionAdd}
                severity="success"
            >
                <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Nowe wizyty zostały dodane
                </Alert>
            </Snackbar>
            <Snackbar
                open={openEdit}
                autoHideDuration={6000}
                action={actionEdit}
                severity="success"
            >
                <Alert onClose={handleEditSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Termin wizyty został zmieniony
                </Alert>
            </Snackbar>
            <Snackbar
                open={openDelete}
                autoHideDuration={6000}
                action={actionDelete}
                severity="success"
            >
                <Alert onClose={handleDeleteSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Wizyta została usunięta
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



