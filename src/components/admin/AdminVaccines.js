import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Vaccine from 'models/Vaccine';
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
import { AdminVaccineInfoModal } from './AdminVaccineInfoModal';

export default function AdminVaccinesList() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);

    const instance = ApiConnection("/admin/vaccines/");

    useEffect(() => {
        instance.get(
            "/admin/vaccines"
        ).then(r => {
            for (let i = 0; i < r.data.length; i++) {
                r.data[i].detailsButton = <AdminVaccineInfoModal data={r.data[i]}/>
            }
            setTableData(r.data)
        })
    }, [])

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "name", width: "25%"},
        {Header: "Firma", accesor: "company", width: "10%"},
        {Header: "Wirus", accessor: "virus", width: "15%"},
        {Header: "Liczba dawek", accessor: "numberOfDoses", width: "15%"},
        {Header: "Info", accesor: "detailsButton", width: "10%"},
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
                <Header name={"Administrator"}>
                    <MDBox mt={5} mb={3}>
                        <DataTable table={{columns: tableColumns, rows: tableData}}/>
                    </MDBox>
                </Header>
            }
            <Footer/>
        </DashboardLayout>
    )
}


