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
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminPatientInfoModal } from './AdminPatientInfoModal';
import { AdminAddDoctorModal } from './AdminAddDoctorModal.js';
import AdminPatientEditModal from './AdminPatientEditModal';
import Patient from '../../models/Patient';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import useLogin from 'logic/useLogin';

export default function AdminPatientList() {

    const {LogOut} = useLogin
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const instance = ApiConnection("/admin/patients/");
    const deleteInstance =ApiConnection("/admin/deletePatient/")
    const centerInstance = ApiConnection("/admin/vaccinationCenters")

    useEffect(() => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const  r = await instance.get(
            "/admin/patients"
        ).catch((error) => {
          if(error.response.status === 401)
              LogOut()
        })
        const c = await centerInstance.get(
            "/admin/vaccinationCenters"
        )
        c.data = await c.data.filter(function(el,index,arr){
            return el.active;
        })
        let patients = [];
        r.data.forEach(d => {
            let patient = new Patient(d)
            if(d.active)patients.push(patient.toTableData())
        });
        for (let i = 0; i < patients.length; i++) {
            patients[i].deleteButton = <Button onClick={() => handleCancellation(patients[i].id)} color={"error"}>Usuń</Button>
            patients[i].detailsButton = <AdminPatientInfoModal data={patients[i]}/>
            patients[i].doctorButton = <AdminAddDoctorModal data={patients[i]} centers={c.data} f={updateData} o={setOpenAdd}/>
            patients[i].modifyButton = <AdminPatientEditModal data={patients[i]} f={updateData} o={setOpenEdit}/>
        }
        setTableData(patients)
        setLoading(false)
    }

    const handleCancellation = async (id) => {
        const url = "/admin/patients/deletePatient/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
        setLoading(false)
        setOpenDelete(true)
    }

    const tableColumns = [
        {Header: "Imię", accessor: "firstName", width: "10%"},
        {Header: "Nazwisko", accessor: "lastName", width: "10%"},
        {Header: "Pesel", accessor: "PESEL", width: "15%"},
        {Header: "Info", accessor: "detailsButton", width: "15%"},
        {Header: "Modyfikuj", accessor: "modifyButton", width: "15%"},
        {Header: "Doktoryzuj", accessor: "doctorButton", width: "10%"},
        {Header: "Usuń", accessor: "deleteButton", width: "10%"},
    ]
    
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={"Administrator"}>
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
            <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                action={actionAdd}
                severity="success"
            >
                <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Nowy lekarz został dodany
                </Alert>
            </Snackbar>
            <Snackbar
                open={openEdit}
                autoHideDuration={6000}
                action={actionEdit}
                severity="success"
            >
                <Alert onClose={handleEditSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Dane pacjenta zostały zmienione
                </Alert>
            </Snackbar>
            <Snackbar
                open={openDelete}
                autoHideDuration={6000}
                action={actionDelete}
                severity="success"
            >
                <Alert onClose={handleDeleteSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Pacjent został usunięty
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )

}