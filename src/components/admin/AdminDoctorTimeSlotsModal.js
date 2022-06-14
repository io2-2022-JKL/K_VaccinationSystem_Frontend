import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";
import { modalStyle } from "../../styles/modal.css";
import "../../styles/global.css"
import ApiConnection from "../../logic/api/ApiConnection";
import DataTable from "../../examples/Tables/DataTable";

export default function AdminDoctorTimeSlotsModal(props) {

    const [open, setOpen] = useState(false);
    const [timeSlots, setTimeSlots] = useState([])

    const instance = ApiConnection("/admin/doctors/Timeslots/");

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const onOpen = async () => {
        const r = await instance.get(
            "/admin/doctors/Timeslots/" + props.data.id
        )
        r.data = await r.data.filter(function(el,index,arr){
            return el.active
        })
        for (let i = 0; i < r.data.length; i++) {
            r.data[i].deleteButton = <Button onClick={() => handleCancellation(r.data[i].id)} color={"error"}>Usuń</Button>
        }
        setTimeSlots(r.data)
        setOpen(true)
    } 

    const handleCancellation = async (id) => {
        const deleteInstance = ApiConnection("/admin/doctors/timeSlots/deleteTimeSlots")
        const url = "/admin/doctors/Timeslots/deleteTimeslots"
        const slots = []
        slots[0] = {"id": id}

        await deleteInstance.post(
            url, [slots[0]]
        )
        handleClose()
        props.f()
    }

    const tableColumns = [
        {Header: "Od", accessor: "from", width: "35%"},
        {Header: "Do", accessor: "to", width: "35%"},
        {Header: "Usuń", accessor: "deleteButton", width: "30%"},
    ]

    return (
        <>
        <Button onClick={onOpen}>Sloty</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Time sloty doktora {props.data.firstName} {props.data.lastName}
                </Typography>
                <Box mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: timeSlots}}/>
                </Box>
            </Box>
        </Modal>
        </>
    )
}