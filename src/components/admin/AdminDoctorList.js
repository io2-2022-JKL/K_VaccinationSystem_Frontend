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
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminDoctorInfoModal } from './AdminDoctorInfoModal';
import { AdminDoctorModificationModal } from './AdminDoctorModificationModal'

export default function AdminDoctorList() {

    const [loading, setLoading] = useState(true)
    const [doctorsExist, setExistance] = useState(true)
    const [tableData, setTableData] = useState([])

    const updateData = async () => {
        const instance = ApiConnection("/admin/doctors")
        const centerInstance = ApiConnection("/admin/vaccinationCenters")
        const r = await instance.get(
            "/admin/doctors"
        ).catch((error) => {
            setExistance(false)
        }
        )
        if (typeof r !== 'undefined')
        {
            const c = await centerInstance.get(
                "/admin/vaccinationCenters"
            )
            for (let i = 0; i < r.data.length; i++) {
                r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].id)} color={"error"}>Usuń</Button>
                r.data[i].detailsButton = <AdminDoctorInfoModal data={r.data[i]}/>
                r.data[i].editButton = <AdminDoctorModificationModal data={r.data[i]} centers={c.data}/>
            }
            setTableData(r.data)
            setLoading(false)
        }
    }

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/doctors/deleteDoctor/")
        setLoading(true)
        setExistance(true)
        const url = "/admin/doctors/deleteDoctor/" + id
        await deleteInstance.delete(
            url
        )
        updateData()
        setLoading(false)
    }

    useEffect(() => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tableColumns = [
        {Header: "Imię", accessor: "firstName", width: "15%"},
        {Header: "Nazwisko", accessor: "lastName", width: "15%"},
        {Header: "Pesel", accessor: "pesel", width: "15%"},
        {Header: "Edycja", accessor: "editButton", width: "20%"},
        {Header: "Info", accessor: "detailsButton", width: "15%"},
        {Header: "Usuń", accessor: "deleteButton", width: "20%"},
    ]
    
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={"Administrator"}>
            {
                doctorsExist?
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
            </Header>
            <Footer/>
        </DashboardLayout>
    )

}