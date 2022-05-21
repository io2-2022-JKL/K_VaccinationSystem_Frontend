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
import { PatientIncomingVisitModal } from './PatientVisitModal';
import Loader from "react-loader";

export default function PatientDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const instance = ApiConnection("/patient/appointments/formerAppointments/");

    useEffect(() => {
        instance.get(
            "/patient/appointments/formerAppointments/" + GetId()
        ).then(r => {
            for(let i = 0; i < r.data.length; i++)
            {
                r.data[i].detailsButton = <PatientIncomingVisitModal data={r.data[i]}/>
            }
            setTableData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",

    })

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "25%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "25%"},
        {Header: "Data", accessor: "windowBegin", width: "25%"},
        {Header: "Szczegóły", accessor: "detailsButton", width: "25%"},
    ]




    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.firstName + " " + patient.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: tableData}}/>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



