import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminVaccinationCenterInfoModal } from "./AdminVaccinationCenterModals"
import { Button } from '@mui/material';

export default function AdminVaccinationCenterList() {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    useEffect(async () => {
        updateData()
    }, [])

    const updateData = async () =>
    {
        const instance = ApiConnection("/admin/vaccinationCenters/");
        const r = await instance.get("/admin/vaccinationCenters")
        for (let i = 0; i < r.data.length; i++) {
            r.data[i].detailsButton = <AdminVaccinationCenterInfoModal data={r.data[i]}/>
            r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].id)} color={"error"}>Usuń</Button>
        }
        console.log(r.data)
        setTableData(r.data)
        setLoading(false)
    }

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/vaccinationCenters/deleteVaccinationCenter/")
        setLoading(true)
        const url = "/admin/vaccinationCenters/deleteVaccinationCenter/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
    }

    const tableColumns = [
        {Header: "Nazwa centrum", accessor: "name", width: "20%"},
        {Header: "Adres", accessor: "address", width: "20%"},
        {Header: "Miasto", accessor: "city", width: "25%"},
        {Header: "Info", accessor: "detailsButton", width: "25%"},
        {Header: "Usuń", accessor: "deleteButton", width: "10%"},
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



