import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
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
import { AdminVaccinationCenterInfoModal } from "./AdminVaccinationCenterModals"

export default function AdminVaccinationCenterList() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);

    const instance = ApiConnection("/admin/vaccinationCenters/");

    useEffect(() => {
        instance.get(
            "/admin/vaccinationCenters"
        ).then(r => {
            for (let i = 0; i < r.data.length; i++) {
                r.data[i].detailsButton = <AdminVaccinationCenterInfoModal data={r.data[i]}/>
            }
            setTableData(r.data)
        }).finally(() => {
            setLoading(false)
        });
    }, [])

    const tableColumns = [
        {Header: "Nazwa centrum", accessor: "name", width: "25%"},
        {Header: "Adres", accesor: "street", width: "25%"},
        {Header: "Miasto", accessor: "city", width: "25%"},
        {Header: "Info", accessor: "detailsButton", width: "25%"},
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



