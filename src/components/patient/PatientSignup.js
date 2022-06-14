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
import { PatientSignupVisitModal } from "./PatientVisitModal";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { PatientVisitSignUpModal } from './PatientVisitSignUpModal';

export default function PatientSignup() {

    const {GetId, isLoggedIn} = useLogin();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [fromDate, setFromDate] = useState("2010-12-09T00:00");
    const [toDate, setToDate] = useState("2023-05-09T23:59");
    const [open, setOpen] = useState(true);
    const [cityFilter, setCityFilter] = useState("");
    const [virusFilter, setVirusFilter] = useState("");
    const [patientData, setPatientData] = useState([]);
    const [viruses, setViruses] = useState([])
    const [cities, setCities] = useState([])

    const handleClose = () => {
        setOpen(false);
    };

    const createURL = () => {
        let url = "/patient/timeSlots/Filter?" + "city=" + cityFilter +
            "&dateFrom=" + fromDate.substring(8, 10) + "-" + fromDate.substring(5, 7) + "-" + fromDate.substring(0, 4) +
            "&dateTo=" +
            toDate.substring(8, 10) + "-" + toDate.substring(5, 7) + "-" + toDate.substring(0, 4)
             +
            "&virus=" + virusFilter;
            url = url.replace(" ", "%20")
        return url;
    }

    const handleFilter = async () => {
        const instance = ApiConnection("/patient/timeSlots/filter");
        const r = await instance.get(
            createURL()
        )
        configureTableData(r.data)
        setLoading2(false)
        handleClose()
    }

    const configureTableData = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].signInButton = <PatientVisitSignUpModal data={data[i]} f={handleFilter}/>
            data[i].detailsButton = <PatientSignupVisitModal data={data[i]}/>
        }
        setTableData(data);
    }

    useEffect(async () => {
        const instance2 = ApiConnection("/patient/info/")
        const instanceViruses = ApiConnection("/viruses")
        const instacneCities = ApiConnection("/cities")
        let id = GetId()
        if(isLoggedIn("/doctor"))
        {
            const instanceDoctor = ApiConnection("/doctor/info")
            const d = await instanceDoctor.get("doctor/info/" + GetId())
            id = d.data.patientAccountId
        }
        const r = await instance2.get(
            "/patient/info/" + id
        )
        setPatientData(r.data)
        setLoading2(false)
        const v = await instanceViruses.get(
            "/viruses"
        )
        const c = await instacneCities.get(
            "/cities"
        )
        setCities(c.data)
        setViruses(v.data)
        setLoading(false)
        setCityFilter(c.data[0].city)
        setVirusFilter(v.data[0].virus)
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
                                <Select
                                    variant="standard"
                                    fullWidth
                                    id="select-city"
                                    defaultValue={cities[0].city}
                                    label="Miasto"
                                    onChange={e => setCityFilter(e.target.value)}
                                    >
                                    {cities.map((record) => (
                                        <MenuItem value={record.city}>
                                        {record.city}
                                        </MenuItem>
                                        ))}
                                </Select>
                            </MDBox>
                            <MDBox mb={3}>
                                <Select
                                variant="standard"
                                fullWidth
                                id="select-virus"
                                defaultValue={viruses[0].virus}
                                label="Wirus"
                                onChange={e => setVirusFilter(e.target.value)}
                                >
                                    {viruses.map((record) => (
                                        <MenuItem value={record.virus}>
                                        {record.virus}
                                        </MenuItem>
                                        ))}
                                </Select>
                            </MDBox>
                            <MDBox mb={3}>
                                <TextField
                                    id="datefrom"
                                    label="Data od"
                                    type="datetime-local"
                                    defaultValue={fromDate}
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
                                    type="datetime-local"
                                    defaultValue={toDate}
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



