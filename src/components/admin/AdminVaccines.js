import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import '../../models/User';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminVaccineInfoModal } from './AdminVaccineInfoModal';
import { Button } from '@mui/material';
import AdminVaccineEditModal from './AdminVaccineEditModal';
import { Typography } from '@mui/material';
import AdminVaccineAddModal from './AdminVaccineAddModal';

export default function AdminVaccinesList() {

    const [loading, setLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const [vaccinesExist, setExistance] = useState(true)
    const [viruses, setViruses] = useState([])

    useEffect(() => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateData = async () =>{
        const instance = ApiConnection("/admin/vaccines/")
        const virusInstance = ApiConnection("/viruses")
        const c = await virusInstance.get("/viruses")
        const r = await instance.get("/admin/vaccines")
        console.log(c)
        for (let i = 0; i < r.data.length; i++) {
            r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].vaccineId)} color={"error"}>Usuń</Button>
            r.data[i].detailsButton = <AdminVaccineInfoModal data={r.data[i]}/>
            r.data[i].editButton = <AdminVaccineEditModal data={r.data[i]} viruses={c.data}/>
        }
        await setTableData(r.data)
        await setViruses(c.data)
        await setLoading(false)
    }

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/vaccines/deleteVaccine/")
        setLoading(true)
        setExistance(true)
        const url = "/admin/vaccines/deleteVaccine/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
        setLoading(false)
    }

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "name", width: "20%"},
        {Header: "Firma", accessor: "company", width: "15%"},
        {Header: "Wirus", accessor: "virus", width: "15%"},
        {Header: "Liczba dawek", accessor: "numberOfDoses", width: "15%"},
        {Header: "Info", accessor: "detailsButton", width: "10%"},
        {Header: "Edytuj", accessor: "editButton", width: "10%"},
        {Header: "Usuń", accessor: "deleteButton", width: "10%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={"Administrator"}>
            {
                vaccinesExist?
                <>
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
                </>
                :
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: 30 }}>
                    <Typography>
                        404 nie ma doktorów
                    </Typography>
                </Grid>
            }
            <Grid>
                <AdminVaccineAddModal viruses={viruses}/>
            </Grid>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



