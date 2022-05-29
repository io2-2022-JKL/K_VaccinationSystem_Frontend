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
import Loader from "react-loader";

export default function PatientDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);

    const instance = ApiConnection("/patient/certificates/");
    const instance2 = ApiConnection("/patient/info/");

    useEffect(() => {
        instance.get(
            "/patient/certificates/" + GetId()
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
        {Header: "Szczepionka", accessor: "Vaccine", width: "25%"},
        {Header: "Od", accessor: "from", width: "25%"},
        {Header: "Do", accessor: "to", width: "25%"},
        {Header: "", accessor: "download", width: "25%"},
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