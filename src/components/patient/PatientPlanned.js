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
import Button from "@mui/material/Button";
import Loader from "react-loader";
import { PatientIncomingVisitModal } from './PatientVisitModal';

export default function PatientDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const instance = ApiConnection("/patient/appointments/incomingAppointments/");

    useEffect(() => {
        updateData();
    }, [])


    const updateData = () => {
        instance.get(
            "/patient/appointments/incomingAppointments/" + GetId()
        ).then(r => {
            for(let i = 0; i < r.data.length; i++)
            {
                r.data[i].button = <Button onClick={() => handleCancellation(r.data[i].appointmentId)} color={"error"}>Anuluj</Button>
                r.data[i].detailsButton = <PatientIncomingVisitModal data={r.data[i]}/>
            }
            setTableData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
    }
    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",
    })

    const handleCancellation = (id) => {
        const url = "/patient/appointments/incomingAppointments/cancelAppointments/" + GetId() + "/" + id

        instance.delete(
            url
        ).then(r => {
            updateData()
        })
            .finally(() => {
                setLoading(false)
            });
    }

    const tableColumns = [
        {Header: "Wirus", accessor: "vaccineVirus", width: "10%"},
        {Header: "Centrum szczepień", accessor: "vaccinationCenterName", width: "20%"},
        {Header: "Misto", accessor: "vaccinationCenterCity", width: "15%"},
        {Header: "Ulica", accessor: "vaccinationCenterStreet", width: "15%"},
        {Header: "Data", accessor: "windowBegin", width: "20%"},
        {Header: "Szczegóły", accessor: "detailsButton", width: "10%"},
        {Header: "", accessor: "button", width: "10%"},
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