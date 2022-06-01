import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";
import {modalStyle} from "../../styles/modal.css";
import "../../styles/global.css"

export function AdminPatientInfoModal(props) {

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const style = modalStyle()

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
                    Informacje o pacjencie
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="subtitle2">
                    <div>Imię: {props.data.firstName} {props.data.lastName}</div>
                    <div>PESEL: {props.data.pesel}</div>
                    <div>Mail: {props.data.mail}</div>
                    <div>Nr telefonu: {props.data.phoneNumber}</div>
                    <div>Data urodzenia: {props.data.dateOfBirth.slice(0,10)}</div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}