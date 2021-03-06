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

import Loader from "react-loader";

export default function DoctorPlanned() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        const instance = ApiConnection("/patient/appointments/formerAppointments/");
        const instance2 = ApiConnection("/patient/info/");
        instance.get(
            "/patient/appointments/formerAppointments/" + GetId()
        ).then(r => {
            setTableData(r.data)
        })
            .finally(() => {
                //setLoading(false)
            });
        instance2.get(
            "/patient/info/" + GetId()
        ).then(r => {
            setDoctorData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const doctor = new Patient(doctorData);

    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "50%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "25%"},
        {Header: "Data", accessor: "windowBegin", width: "25%"},
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
                    <Header name={doctor.getFirstName + " " + doctor.getLastName} position={"Lekarz"}>
                        <MDBox mt={5} mb={3}>
                            <DataTable table={{columns: tableColumns, rows: tableData}}/>
                        </MDBox>
                    </Header>
            }
            <Footer/>
        </DashboardLayout>
    )
}



