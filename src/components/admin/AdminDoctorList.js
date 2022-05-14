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

export default function AdminDoctorList() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const instance = ApiConnection("/admin/doctors");

    useEffect(() => {
        instance.get(
            "/admin/doctors"
        ).then(r => {
            setTableData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const tableColumns = [
        {Header: "Imię", accessor: "firstName", width: "25%"},
        {Header: "Nazwisko", accessor: "lastName", width: "25%"},
        {Header: "Pesel", accessor: "PESEL", width: "25%"},
        {Header: "Status", accessor: "status", width: "25%"},
    ]
    
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header position={"Admin"}>
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