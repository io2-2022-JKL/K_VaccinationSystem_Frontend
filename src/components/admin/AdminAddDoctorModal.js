import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";
import {modalStyle} from "../../styles/modal.css";
import "../../styles/global.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ApiConnection from "../../logic/api/ApiConnection";


export function AdminAddDoctorModal(props) {
    const [open, setOpen] = useState(false);
    const [center, setCenter] = useState('');

    const instance = ApiConnection("/admin/doctors/addDoctor");

    const handleClose = () => {

        setOpen(false);
    }

    const style = modalStyle()

    const handleChange = (event) => {
        setCenter(event.target.value);
      };

    const addDoctor = async (patient, center) =>
    {
        await instance.post(
            "/admin/doctors/addDoctor", {
                "patientId": patient,
                "vaccinationCenterId": center
            })
        handleClose()
        props.f()
        props.o(true)
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Doktoryzuj</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Dodaj doktora {props.data.firstName} {props.data.lastName}
                </Typography>
                <Box sx={{ minWidth: 120, minHeight: 50 }}>
                <FormControl fullWidth variant="standard" size="big">
                    <InputLabel id="select-center-label">Centrum Szczepień</InputLabel>
                    <Select
                        labelId="select-center-label"
                        id="select-center"
                        value={center}
                        defaultValue={"none"}
                        label="Centrum"
                        onChange={handleChange}
                        >
                    {props.centers.map((record) => (
                        <MenuItem key={record.name} value={record.id}>
                        {record.name}, {record.street}, {record.city}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Box>
                <Button onClick={() => addDoctor(props.data.id, center)}>
                        Doktoryzuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}