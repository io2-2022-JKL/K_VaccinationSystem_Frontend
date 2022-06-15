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
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminVaccineInfoModal } from './AdminVaccineInfoModal';
import { Alert, Button } from '@mui/material';
import AdminVaccineEditModal from './AdminVaccineEditModal';
import { Typography } from '@mui/material';
import AdminVaccineAddModal from './AdminVaccineAddModal';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useLogin from 'logic/useLogin';

export default function AdminVaccinesList() {

    const {LogOut} = useLogin
    const [loading, setLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const [vaccinesExist, setExistance] = useState(true)
    const [viruses, setViruses] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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
    )

    const updateData = async () =>{
        const instance = ApiConnection("/admin/vaccines/")
        const virusInstance = ApiConnection("/viruses")
        const c = await virusInstance.get("/viruses")
        const r = await instance.get("/admin/vaccines").catch((error) => {
          if(error.response.status === 401)
              LogOut()
        })
        r.data = await r.data.filter(function(el,index,arr){
            return el.active;
        })
        for (let i = 0; i < r.data.length; i++) {
            r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].vaccineId)} color={"error"}>Usuń</Button>
            r.data[i].detailsButton = <AdminVaccineInfoModal data={r.data[i]}/>
            r.data[i].editButton = <AdminVaccineEditModal data={r.data[i]} viruses={c.data} f={updateData} o={setOpenEdit}/>
        }
        setTableData(r.data)
        setViruses(c.data)
        setLoading(false)
    }

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/vaccines/deleteVaccine/")
        setExistance(true)
        const url = "/admin/vaccines/deleteVaccine/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
        setOpenDelete(true)
    }

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "name", width: "20%"},
        {Header: "Firma", accessor: "company", width: "15%"},
        {Header: "Wirus", accessor: "virus", width: "15%"},
        {Header: "Liczba dawek", accessor: "numberOfDoses", width: "15%"},
        {Header: "Info", accessor: "detailsButton", width: "10%"},
        {Header: "Edytuj", accessor: "editButton", width: "10%"},
        {Header: "Usuń", accessor: "deleteButton", width: "10%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={"Administrator"}>
            {
                vaccinesExist?
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
                        Nie ma żadnych doktorów, dodaj nowych z listy pacjentów
                    </Typography>
                </Grid>
            }
            <Grid>
                <AdminVaccineAddModal viruses={viruses} f={updateData} o={setOpenAdd}/>
            </Grid>
            <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                action={actionAdd}
                severity="success"
            >
                <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Nowe Szczepionka została dodana
                </Alert>
            </Snackbar>
            <Snackbar
                open={openEdit}
                autoHideDuration={6000}
                action={actionEdit}
                severity="success"
            >
                <Alert onClose={handleEditSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Szczepionka została zmodyfikowana
                </Alert>
            </Snackbar>
            <Snackbar
                open={openDelete}
                autoHideDuration={6000}
                action={actionDelete}
                severity="success"
            >
                <Alert onClose={handleDeleteSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Szczepionka została usunięta
                </Alert>
            </Snackbar>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



