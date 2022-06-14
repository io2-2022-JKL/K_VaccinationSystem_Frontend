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
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminDoctorInfoModal } from './AdminDoctorInfoModal';
import { AdminDoctorModificationModal } from './AdminDoctorModificationModal'
import AdminDoctorTimeSlotsModal from './AdminDoctorTimeSlotsModal';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert } from '@mui/material'

export default function AdminDoctorList() {

    const [loading, setLoading] = useState(true)
    const [doctorsExist, setExistance] = useState(true)
    const [tableData, setTableData] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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
        const instance = ApiConnection("/admin/doctors")
        const centerInstance = ApiConnection("/admin/vaccinationCenters")
        const r = await instance.get(
            "/admin/doctors"
        ).catch((error) => {
            if(error.response.status === 404)
                setExistance(false)
        }
        )
        if (typeof r !== 'undefined')
        {
            r.data.forEach(element => {
                if(element.PESEL===undefined) element.PESEL = element.pesel
            });
            r.data = r.data.filter(function(el,index,arr){
                return el.active;
            })
            const c = await centerInstance.get(
                "/admin/vaccinationCenters"
            )
            for (let i = 0; i < r.data.length; i++) {
                r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].id)} color={"error"}>Usuń</Button>
                r.data[i].detailsButton = <AdminDoctorInfoModal data={r.data[i]}/>
                r.data[i].timeSlotButton = <AdminDoctorTimeSlotsModal data={r.data[i]} f={updateData} o={setOpenAdd}/>
                r.data[i].editButton = <AdminDoctorModificationModal data={r.data[i]} centers={c.data} f={updateData} o={setOpenEdit}/>
            }
            setTableData(r.data)
            setLoading(false)
        }
    }

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/doctors/deleteDoctor/")
        setLoading(true)
        setExistance(true)
        const url = "/admin/doctors/deleteDoctor/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
        setLoading(false)
        setOpenDelete(true)
    }

    useEffect(() => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tableColumns = [
        {Header: "Imię", accessor: "firstName", width: "15%"},
        {Header: "Nazwisko", accessor: "lastName", width: "15%"},
        {Header: "Pesel", accessor: "PESEL", width: "15%"},
        {Header: "Edycja", accessor: "editButton", width: "10%"},
        {Header: "Info", accessor: "detailsButton", width: "15%"},
        {Header: "Sloty", accessor: "timeSlotButton", width: "10%"},
        {Header: "Usuń", accessor: "deleteButton", width: "20%"},
    ]
    
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={"Administrator"}>
            {
                doctorsExist?
                <>
                {
                    loading?
                        <Grid>
                            <Loader /> 
                        </Grid> 
                        :
                        <MDBox mt={5} mb={3}>
                            <DataTable table={{columns: tableColumns, rows: tableData}}/>
                        </MDBox>
                }
                </>
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
                        404 nie ma doktorów
                    </Typography>
                </Grid>
            }
             <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                action={actionAdd}
                severity="success"
            >
                <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Usunięto wizytę doktora
                </Alert>
            </Snackbar>
            <Snackbar
                open={openEdit}
                autoHideDuration={6000}
                action={actionEdit}
                severity="success"
            >
                <Alert onClose={handleEditSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Dane doktora zostały zmienione
                </Alert>
            </Snackbar>
            <Snackbar
                open={openDelete}
                autoHideDuration={6000}
                action={actionDelete}
                severity="success"
            >
                <Alert onClose={handleDeleteSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Doktor został usunięty
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )

}