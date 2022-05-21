import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
import '../../models/User';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Divider from "@mui/material/Divider";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";

export default function PatientDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);

    const instance = ApiConnection("/patient/appointments/formerAppointments/");
    const instance2 = ApiConnection("/patient/info/");

    useEffect(() => {
        instance.get(
            "/patient/appointments/formerAppointments/" + GetId()
        ).then(r => {
            setTableData(r.data)
        })
            .finally(() => {
                //setLoading(false)
            });
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
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "50%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "25%"},
        {Header: "Data", accessor: "windowBegin", width: "25%"},
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
                    <MDBox mt={5} mb={3}>
                        <DataTable table={{columns: tableColumns, rows: tableData}}/>
                    </MDBox>
                </Header>
            }
            <Footer/>
        </DashboardLayout>
    )
}



