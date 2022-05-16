import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {useEffect, useState} from 'react';
import { Button } from "@mui/material";

export function PatientSignupVisitModal(props) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
                    Szczegóły wizyty
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div>Data: {props.data.windowBegin.substring(8, 10)}.{props.data.windowBegin.substring(5, 7)}.{props.data.windowBegin.substring(0, 4)}</div>
                    <div>Godzina: {props.data.windowBegin.substring(11, 16)}-{props.data.to.substring(11, 16)}</div>
                    <div>Centrum: {props.data.vaccinationCenterName}</div>
                    <div>Adres: {props.data.vaccinationCenterStreet}, {props.data.vaccinationCenterCity}</div>
                    <div>Możliwe szczepienia: {props.data.availableVaccines[0].name}</div>
                    <div>Doktor: {props.data.doctorFirstName} {props.data.doctorLastName}</div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}

export function PatientIncomingVisitModal(props) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
                    Szczegóły wizyty
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div>Data: {props.data.windowBegin.substring(8, 10)}.{props.data.windowBegin.substring(5, 7)}.{props.data.windowBegin.substring(0, 4)}</div>
                    <div>Godzina: {props.data.windowBegin.substring(11, 16)}-{props.data.windowEnd.substring(11, 16)}</div>
                    <div>Centrum: {props.data.vaccinationCenterName}</div>
                    <div>Adres: {props.data.vaccinationCenterStreet}, {props.data.vaccinationCenterCity}</div>
                    <div>Możliwe szczepienia: {props.data.vaccineName}</div>
                    <div>Doktor: {props.data.doctorFirstName} {props.data.doctorLastName}</div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}