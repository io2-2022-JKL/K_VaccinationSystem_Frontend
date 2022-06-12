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
import ApiConnection from "../../logic/api/ApiConnection";
import Loader from "react-loader";
import { AdminPatientInfoModal } from './AdminPatientInfoModal';
import { AdminAddDoctorModal } from './AdminAddDoctorModal.js';
import AdminPatientEditModal from './AdminPatientEditModal';
import Patient from '../../models/Patient';

export default function AdminPatientList() {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const instance = ApiConnection("/admin/patients/");
    const deleteInstance =ApiConnection("/admin/deletePatient/")
    const centerInstance = ApiConnection("/admin/vaccinationCenters")

    useEffect(() => {
        updateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateData = async () => {
        const  r = await instance.get(
            "/admin/patients"
        )
        const c = await centerInstance.get(
            "/admin/vaccinationCenters"
        )
        let patients = [];
        r.data.forEach(d => {
            let patient = new Patient(d)
            if(d.active)patients.push(patient.toTableData())
        });
        for (let i = 0; i < patients.length; i++) {
            patients[i].deleteButton = <Button onClick={() => handleCancellation(patients[i].id)} color={"error"}>Usuń</Button>
            patients[i].detailsButton = <AdminPatientInfoModal data={patients[i]}/>
            patients[i].doctorButton = <AdminAddDoctorModal data={patients[i]} centers={c.data}/>
            patients[i].modifyButton = <AdminPatientEditModal data={patients[i]}/>
        }
        console.log(patients)
        setTableData(patients)
        setLoading(false)
    }

    const handleCancellation = (id) => {
        const url = "/admin/patients/deletePatient/" + id
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
        {Header: "Imię", accessor: "firstName", width: "10%"},
        {Header: "Nazwisko", accessor: "lastName", width: "10%"},
        {Header: "Pesel", accessor: "PESEL", width: "15%"},
        {Header: "Info", accessor: "detailsButton", width: "15%"},
        {Header: "Modyfikuj", accessor: "modifyButton", width: "15%"},
        {Header: "Doktoryzuj", accessor: "doctorButton", width: "10%"},
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