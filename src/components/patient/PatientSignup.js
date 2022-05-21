import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import '../../models/User';
import Patient from '../../models/Patient';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Loader from "react-loader";
import { PatientSignupVisitModal } from './PatientVisitModal';

export default function PatientSignup() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [fromDate, setFromDate] = useState("2010-12-09");
    const [toDate, setToDate] = useState("2023-05-09");
    const [open, setOpen] = useState(true);
    const [cityFilter, setCityFilter] = useState("Warszawa");
    const [virusFilter, setVirusFilter] = useState("Koronawirus");
    const [patientData, setPatientData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const instance = ApiConnection("/patient/timeSlots/Filter");
    const instance2 = ApiConnection("/patient/info/");

    const signIn = (id, vaccine) => {
        const url = "/patient/timeSlots/Book/" + GetId() + "/" + id + "/" + vaccine;
        instance.post(
            url
        ).then(r => {
            handleFilter()
        })
            .finally(() => {
                setLoading2(false)
            });
    }

    const createURL = () => {
        const url = "/patient/timeSlots/Filter?" + "city=" + cityFilter +
            "&dateFrom=" + fromDate.substring(8, 10) + "-" + fromDate.substring(5, 7) + "-" + fromDate.substring(0, 4) +
            " 00:00" + "&dateTo=" +
            toDate.substring(8, 10) + "-" + toDate.substring(5, 7) + "-" + toDate.substring(0, 4)
            + " 23:59&" +
            "virus=" + virusFilter;
        return url;

    }

    const handleFilter = () => {
        instance.get(
            createURL()
        ).then(r => {
            configureTableData(r.data)
        })
            .finally(() => {
                setLoading2(false)
            });
        handleClose()
    }

    const configureTableData = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].signInButton = <Button onClick={() => signIn(data[i].timeSlotId, data[i].availableVaccines[0].vaccineId)}>Wybierz</Button>;
            data[i].detailsButton = <PatientSignupVisitModal data={data[i]}/>
        }
        setTableData(data);
    }

    useEffect(() => {
        instance2.get(
            "/patient/info/" + GetId()
        ).then(r => {
            setPatientData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const patient = new Patient(patientData);

    const tableColumns = [
        {Header: "Nazwa centrum", accessor: "vaccinationCenterName", width: "50%"},
        {Header: "Ulica", accessor: "vaccinationCenterStreet", width: "25%"},
        {Header: "Termin", accessor: "from", width: "25%"},
        {Header: "Szczegóły", accessor: "detailsButton", width: "10%"},
        {Header: "Zapisz się", accessor: "signInButton", width: "15%"},
    ]


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            {
                loading?
                    <Grid>
                        <Loader /> 
                    </Grid> 
                    :
                <Header name={patient.getFirstName + " " + patient.getLastName} position={"Pacjent"}>
                {
                    loading2?
                    <Grid>
                        <Loader /> 
                    </Grid> 
                    :
                    <MDBox mt={5} mb={3}>
                        <DataTable table={{columns: tableColumns, rows: tableData}}/>
                    </MDBox>
                }
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Filtruj</DialogTitle>
                    <DialogContent>
                        <Stack ml={10} mr={10}>
                            <MDBox mb={3}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="city"
                                    label="Miasto"
                                    type="text"
                                    fullWidth
                                    onChange={e => setCityFilter(e.target.value)}
                                    value={cityFilter}
                                    variant="standard"
                                />
                            </MDBox>
                            <MDBox mb={3}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="virus"
                                    label="Wirus"
                                    type="text"
                                    fullWidth
                                    onChange={e => setVirusFilter(e.target.value)}
                                    value={virusFilter}
                                    variant="standard"
                                />
                            </MDBox>
                            <MDBox mb={3}>
                                <TextField
                                    id="datefrom"
                                    label="Data od"
                                    type="date"
                                    defaultValue="2010-12-09"
                                    onChange={e => setFromDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                            </MDBox>
                            <MDBox mb={3}>
                                <TextField
                                    id="dateto"
                                    label="Data do"
                                    type="date"
                                    defaultValue="2023-05-09"
                                    onChange={e => setToDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                            </MDBox>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        {cityFilter === "" || fromDate === "" || toDate === "" || virusFilter === "" ?
                            <Button onClick={handleClose} disabled>Zastosuj</Button> :
                            <Button onClick={handleFilter}>Zastosuj</Button>}
                    </DialogActions>
                </Dialog>
                <MDBox mt={2} mb={2}>
                    <Grid container spacing={1}>
                        <Grid item xl={11} sx={{display: "flex"}} />
                        <Grid item xl={1} sx={{display: "flex"}}>
                            <Button onClick={() => setOpen(true)}>Filtruj wyniki</Button>
                        </Grid>
                    </Grid>
                </MDBox>
            </Header>
            }
            <Footer/>
        </DashboardLayout>
    )
}



