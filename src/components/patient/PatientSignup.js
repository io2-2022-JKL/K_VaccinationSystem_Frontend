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
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, Link} from "react-router-dom";

export default function PatientSignup() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [open, setOpen] = useState(true);
    const [cityFilter, setCityFilter] = useState("");
    const [virusFilter, setVirusFilter] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const instance = ApiConnection("/patient/timeSlots/Filter");

    const createURL = () => {
        const url = "/patient/timeSlots/Filter?" + "city=" + cityFilter +
            "&dateFrom=" + fromDate + " 00:00" + "&dateTo=" + toDate + " 23:59&" +
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
                setLoading(false)
            });
        handleClose()
    }

    const configureTableData = (data) => {
        for(let i = 0; i < data.length; i++)
        {
            data[i].signInButton = <button>Zapisz sie</button>
        }
        setTableData(data);
    }

    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",

    })

    const tableColumns = [
        {Header: "Nazwa centrum", accessor: "vaccinationCenterName", width: "50%"},
        {Header: "Ulica", accessor: "vaccinationCenterStreet", width: "25%"},
        {Header: "Termin", accessor: "from", width: "25%"},
        {Header: "", accessor: "signInButton", width: "25%"},
    ]


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.firstName + " " + patient.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
                        <Grid xl={4} sx={{display: "flex"}}>
                            <Button onClick={() => setOpen(true)}>Filtruj wyniki</Button>
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: tableData}}/>
                </MDBox>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <Stack>
                            <MDBox mb={2}>
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
                            <MDBox mb={2}>
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
                            <MDBox mb={2}>
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
                            <MDBox mb={2}>
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
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



