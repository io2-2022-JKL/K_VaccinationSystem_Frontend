import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";

export function PatientSignupVisitModal(props) {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

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
                    <div>Od: {props.data.from}</div>
                    <div>Do: {props.data.to}</div>
                    <div>Centrum: {props.data.vaccinationCenterName}</div>
                    <div>Adres: {props.data.vaccinationCenterStreet}, {props.data.vaccinationCenterCity}</div>
                    <div>Doktor: {props.data.doctorFirstName} {props.data.doctorLastName}</div>
                    <div>Możliwe szczepienia: </div>
                    {props.data.availableVaccines.map((record) => (
                                    <div key={record.id}>
                                        {record.name}
                                    </div>
                                    ))}
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
                    <div>Początek: {props.data.windowBegin}</div>
                    <div>Koniec: {props.data.windowEnd}</div>
                    <div>Centrum: {props.data.vaccinationCenterName}</div>
                    <div>Adres: {props.data.vaccinationCenterStreet}, {props.data.vaccinationCenterCity}</div>
                    <div>Szczepionka: {props.data.vaccineName}</div>
                    <div>Doktor: {props.data.doctorFirstName} {props.data.doctorLastName}</div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}