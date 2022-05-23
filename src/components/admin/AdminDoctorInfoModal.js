import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {useEffect, useState} from 'react';
import { Button } from "@mui/material";
import theme from "assets/theme";
import {modalStyle} from "../../styles/modal.css";
import "../../styles/global.css"

export function AdminDoctorInfoModal(props) {

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
                    Informacje o doktorze
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="subtitle2" component="subtitle2">
                    <div>Imię: {props.data.firstName} {props.data.lastName}</div>
                    <div>PESEL: {props.data.pesel}</div>
                    <div>Mail: {props.data.mail}</div>
                    <div>Nr telefonu: {props.data.phoneNumber}</div>
                    <div>Centrum szczepień: {props.data.name},{props.data.city},{props.data.street}</div>
                    <div>Data urodzenia: {props.data.dateOfBirth}</div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}