import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminVaccinationCenterInfoModal } from "./AdminVaccinationCenterModals"
import { Button, Alert } from '@mui/material';
import AdminVaccinationCenterAddModal from './AdminVaccinationCenterAddModal';
import { Box } from '@mui/material';
import AdminVaccinationCenterEditModal from './AdminVaccinationCenterEditModal';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useLogin from 'logic/useLogin';

export default function AdminVaccinationCenterList() {

    const {LogOut} = useLogin
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
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

    useEffect(async () => {
        updateData()
    }, [])

    const updateData = async () =>
    {
        const instance = ApiConnection("/admin/vaccinationCenters/")
        const r = await instance.get("/admin/vaccinationCenters").catch((error) => {
          if(error.response.status === 401)
              LogOut()
        })
        r.data = await r.data.filter(function(el, index, arr){
            return el.active;
        })
        for (let i = 0; i < r.data.length; i++) {
            r.data[i].detailsButton = <AdminVaccinationCenterInfoModal data={r.data[i]}/>
            r.data[i].editButton = <AdminVaccinationCenterEditModal data={r.data[i]} f={updateData} o={setOpenEdit}/>
            r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].id)}>Usuń</Button>
        }
        setTableData(r.data)
        setLoading(false)
    }

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/vaccinationCenters/deleteVaccinationCenter/")
        setLoading(true)
        const url = "/admin/vaccinationCenters/deleteVaccinationCenter/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
        setOpenDelete(true)
    }

    const tableColumns = [
        {Header: "Nazwa centrum", accessor: "name", width: "20%"},
        {Header: "Adres", accessor: "street", width: "20%"},
        {Header: "Miasto", accessor: "city", width: "20%"},
        {Header: "Info", accessor: "detailsButton", width: "15%"},
        {Header: "Edytuj", accessor: "editButton", width: "15%"},
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
            <Box>
                <AdminVaccinationCenterAddModal f={updateData} o={setOpenAdd}/>
            </Box>
            <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                action={actionAdd}
                severity="success"
            >
                <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Nowe centrum szczepień zostało dodane
                </Alert>
            </Snackbar>
            <Snackbar
                open={openEdit}
                autoHideDuration={6000}
                action={actionEdit}
                severity="success"
            >
                <Alert onClose={handleEditSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Centrum szczepień zostało zmienione
                </Alert>
            </Snackbar>
            <Snackbar
                open={openDelete}
                autoHideDuration={6000}
                action={actionDelete}
                severity="success"
            >
                <Alert onClose={handleDeleteSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Centrum szczepień zostało usunięte
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



