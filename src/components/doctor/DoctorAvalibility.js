import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
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
import DoctorAddTimeSlotsModal from './DoctorAddTimeSlotsModal';
import { Button } from '@mui/material';

import Loader from "react-loader";

export default function DoctorAvalibility() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [vaccinesExist, setExistance] = useState(true)

    useEffect(async () => {
        updateData()
    }, [])

    const updateData = async () => {
        const instance = ApiConnection("/doctor/timeSlots/");
        const instance2 = ApiConnection("/patient/info/");
        const c = await instance2.get("/patient/info/" + GetId())
        setPatientData(c.data)
        const r = await instance.get("/doctor/timeSlots/" + GetId())
        for (let i = 0; i < r.data.length; i++)
        {
            r.data[i].deleteButton = <Button onClick={() => handleCancellation(GetId(), r.data[i].id)} color={"error"}>Usuń</Button>
        }
        setTableData(r.data)
        console.log(r.data)
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const handleCancellation = async (id, slotId) => {
        const deleteInstance = ApiConnection("/doctor/timeSlot/delete")
        setLoading(true)
        setExistance(true)
        const url = "/doctor/timeSlot/delete/" + id
        await deleteInstance.post(
            url, {
                "slots": [slotId]
            }
        )
        updateData()
        setLoading(false)
    }

    const tableColumns = [
        {Header: "Od", accessor: "from", width: "50%"},
        {Header: "Do", accessor: "to", width: "25%"},
        {Header: "Usuń", accessor: "deleteButton", width: "25%"},
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
                    <Header name={patientData.firstName + " " + patientData.lastName} position={"Lekarz"}>
                        <MDBox mt={5} mb={3}>
                            <DataTable table={{columns: tableColumns, rows: tableData}}/>
                        </MDBox>
                        <Grid>
                            <DoctorAddTimeSlotsModal/>
                        </Grid>
                    </Header>
            }
            <Footer/>
        </DashboardLayout>
    )
}



