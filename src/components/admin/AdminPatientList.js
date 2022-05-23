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
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminPatientInfoModal } from './AdminPatientInfoModal';

export default function AdminPatientList() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const instance = ApiConnection("/admin/patients/");
    const deleteInstance =ApiConnection("/admin/deletePatient/")

    useEffect(() => {
        updateData()
    }, [])

    const updateData = () => {
        instance.get(
            "/admin/patients"
        ).then(r => {
            for (let i = 0; i < r.data.length; i++) {
                r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].patientId)} color={"error"}>Usuń</Button>
                r.data[i].detailsButton = <AdminPatientInfoModal data={r.data[i]}/>
            }
            setTableData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
    }


    const handleCancellation = (id) => {
        const url = "/admin/deletePatient/" + id

        deleteInstance.delete(
            url
        ).then(r => {
            updateData()
        })
            .finally(() => {
                setLoading(false)
            });
    }

    const tableColumns = [
        {Header: "Imię", accessor: "firstName", width: "25%"},
        {Header: "Nazwisko", accessor: "lastName", width: "25%"},
        {Header: "Pesel", accessor: "pesel", width: "25%"},
        {Header: "Info", accessor: "detailsButton", width: "15%"},
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
            </Header>
            <Footer/>
        </DashboardLayout>
    )

}