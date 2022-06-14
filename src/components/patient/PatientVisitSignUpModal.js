import * as React from 'react';
import { getDialogActionsUtilityClass, Modal } from "@mui/material";
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
import useLogin from '../../logic/useLogin.js'

export function PatientVisitSignUpModal(props) {

    const {GetId, isLoggedIn} = useLogin();
    const [open, setOpen] = useState(false);
    const [vaccine, setVaccine] = useState(props.data.availableVaccines[0].vaccineId)
    const func = props.func

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const handleChange = (event) => {
        setVaccine(event.target.value);
      };

    const signUp = async () =>
    {
        const instance = ApiConnection("/patient/timeSlots/Book/");
        let id = GetId()
        if(isLoggedIn("/doctor"))
        {
            const instanceDoctor = ApiConnection("/doctor/info");
            const d = await instanceDoctor.get("doctor/info/" + GetId())
            id = d.data.patientAccountId;
        }
        await instance.post(
            "/patient/timeSlots/Book/"+ id +
            "/"+props.data.timeSlotId+"/"+vaccine, {
            })
            handleClose()
            props.f()
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Zapisz się</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Zapisz się
                </Typography>
                <Box sx={{ minWidth: 120, minHeight: 50 }}>
                <FormControl fullWidth variant="standard" size="big">
                    <InputLabel id="select-vaccine-label">Szczepionka</InputLabel>
                    <Select
                        labelId="select-vaccine-label"
                        id="select-vaccine"
                        value={vaccine}
                        defaultValue={"none"}
                        label="Szzepionka"
                        onChange={handleChange}
                        >
                    {props.data.availableVaccines.map((record) => (
                        <MenuItem key={record.vaccineId} value={record.vaccineId}>
                        {record.name}, {record.company}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Box>
                <Button onClick={() => signUp()}>
                        Zapisz się
                </Button>
            </Box>
        </Modal>
        </>
    )
}