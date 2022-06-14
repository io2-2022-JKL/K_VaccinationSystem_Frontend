import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";
import { modalStyle } from "../../styles/modal.css";
import "../../styles/global.css"
import ApiConnection from "../../logic/api/ApiConnection";
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

export default function AdminVaccineAddModal(props) {

    let name = "";
    let company = "";
    let virus = "";
    let numberOfDoses = "0";
    let maxDaysBetweenDoses = "0";
    let minDaysBetweenDoses = "0";
    let minPatientAge = "0";
    let maxPatientAge = "0";
    let active = true;

    const [open, setOpen] = useState(false);

    const instance = ApiConnection("/admin/vaccines/addVaccine");

    const handleName = (event) => name = event.target.value;
    const handlecompany = (event) => company = event.target.value;
    const handlevirus = (event) => virus = event.target.value;
    const handlenumberOfDoses = (event) => numberOfDoses = event.target.value;
    const handlemaxDaysBetweenDoses = (event) => maxDaysBetweenDoses = event.target.value;
    const handleminDaysBetweenDoses = (event) => minDaysBetweenDoses = event.target.value;
    const handleMinPatientAge = (event) => minPatientAge = event.target.value;
    const handleMaxPatientAge = (event) => maxPatientAge = event.target.value;

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const addVaccine = async ( 
        virus, 
        name, 
        company, 
        numberOfDoses, 
        minDaysBetweenDoses, 
        maxDaysBetweenDoses, 
        minPatientAge,
        maxPatientAge,
        active) =>
    {
        await instance.post(
            "/admin/vaccines/addVaccine", {
                "virus": virus,
                "name": name,
                "company": company,
                "numberOfDoses": parseInt(numberOfDoses,10),
                "minDaysBetweenDoses": parseInt(minDaysBetweenDoses,10),
                "maxDaysBetweenDoses": parseInt(maxDaysBetweenDoses,10),
                "maxPatientAge": parseInt(maxPatientAge,10),
                "minPatientAge": parseInt(minPatientAge,10),
                "active": active,
            })
        handleClose()
        props.f()
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Utwórz</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Dodaj nową szczepionkę
                </Typography>
                <Box>
                    <Box fullWidthsx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="name" 
                            label="Nazwa" 
                            variant="standard" 
                            defaultValue={name} 
                            onChange={handleName}/>
                    </Box>
                    <Box fullWidthsx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="last_name" 
                            label="Firma" 
                            variant="standard"
                            defaultValue={company} 
                            onChange={handlecompany}/>
                    </Box>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <Select
                            variant="standard"
                            fullWidth
                            id="select-virus"
                            defaultValue={virus}
                            label="Wirus"
                            onChange={handlevirus}
                            >
                            {props.viruses.map((record) => (
                                <MenuItem key={record.virus} value={record.virus}>
                                {record.virus}
                                </MenuItem>
                                ))}
                        </Select>
                    </Box>
                    <Box fullWidthsx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="numberOfDoses" 
                            label="Ilość dawek" 
                            variant="standard" 
                            defaultValue={numberOfDoses} 
                            onChange={handlenumberOfDoses}/>
                    </Box>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Dni pomiędzy od" 
                            variant="standard" 
                            defaultValue={minDaysBetweenDoses} 
                            onChange={handleminDaysBetweenDoses}/>
                        <TextField 
                            id="max_days" 
                            label="Dni pomiędzy do" 
                            variant="standard" 
                            defaultValue={maxDaysBetweenDoses} 
                            onChange={handlemaxDaysBetweenDoses}/>
                    </Grid>
                    <Grid sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Wiek pacjenta od" 
                            variant="standard" 
                            defaultValue={minPatientAge} 
                            onChange={handleMinPatientAge}/>
                        <TextField 
                            id="max_days" 
                            label="Wiek pacjenta do" 
                            variant="standard" 
                            defaultValue={maxPatientAge} 
                            onChange={handleMaxPatientAge}/>
                    </Grid>
                </Box>
                <Button onClick={() => addVaccine(
                    virus, 
                    name, 
                    company, 
                    numberOfDoses, 
                    minDaysBetweenDoses, 
                    maxDaysBetweenDoses, 
                    minPatientAge,
                    maxPatientAge,
                    active)}>
                        Utwórz
                </Button>
            </Box>
        </Modal>
        </>
    )
}