import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {useEffect, useState} from 'react';
import { Button } from "@mui/material";
import "../../styles/patient/patient.css"
import { modalStyle } from "styles/modal.css";

export function AdminVaccineInfoModal(props) {

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const style = modalStyle();

    return (
        <>
        <Button onClick={() => setOpen(true)}>Szczegóły</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Informacje o szczepionce
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="subtitle2" component="subtitle2">
                    <div>Nazwa: {props.data.name}</div>
                    <div>Firma: {props.data.company}</div>
                    <div>Choroba: {props.data.virus}</div>
                    <div>Liczba dawek: {props.data.numberOfDoses}</div>
                    <div>Dni między dawkami: {props.data.minDaysBetweenDoses} - {props.data.maxDaysBetweenDoses}</div>
                    <div>Wiek Pacjenta: {props.data.minPatientAge} - {props.data.maxPatientAge}</div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}