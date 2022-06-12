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

export default function AdminVaccineeditModal(props) {

    const [open, setOpen] = useState(false);

    let name = props.data.name;
    let company = props.data.company;
    let virus = props.data.virus;
    let numberOfDoses = props.data.numberOfDoses;
    let maxDaysBetweenDoses = props.data.maxDaysBetweenDoses;
    let vaccineId = props.data.vaccineId;
    let minDaysBetweenDoses = props.data.minDaysBetweenDoses;
    let minPatientAge = props.data.minPatientAge;
    let maxPatientAge = props.data.maxPatientAge;
    let active = props.data.active;

    const instance = ApiConnection("/admin/vaccine/editVaccine");

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

    const editVaccine = async (vaccineId, 
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
            "/admin/vaccines/editVaccine", {
                "vaccineId": vaccineId,
                "virus": virus,
                "name": name,
                "company": company,
                "numberOfDoses": numberOfDoses,
                "minDaysBetweenDoses": minDaysBetweenDoses,
                "maxDaysBetweenDoses": maxDaysBetweenDoses,
                "maxPatientAge": maxPatientAge,
                "minPatientAge": minPatientAge,
                "active": active,
            })
        handleClose()
        window.location.reload(false);
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Modyfikuj</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Zmodyfikuj dane szczepionki {props.data.name}
                </Typography>
                <Box>
                    <Box sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="name" 
                            label="Nazwa" 
                            variant="standard" 
                            defaultValue={name} 
                            onChange={handleName}/>
                    </Box>
                    <Box sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="last_name" 
                            label="Firma" 
                            variant="standard"
                            defaultValue={company} 
                            onChange={handlecompany}/>
                    </Box>
                    <Box sx={{pl:4, pr:4, pt:2, pd:2}}>
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
                    <Box sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="numberOfDoses" 
                            label="Ilość dawek" 
                            variant="standard" 
                            defaultValue={numberOfDoses} 
                            onChange={handlenumberOfDoses}/>
                    </Box>
                    <Grid sx={{pl:4, pr:4, pt:2, pd:2}} container>
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
                <Button onClick={() => editVaccine(
                    vaccineId, 
                    virus, 
                    name, 
                    company, 
                    numberOfDoses, 
                    minDaysBetweenDoses, 
                    maxDaysBetweenDoses, 
                    minPatientAge,
                    maxPatientAge,
                    active)}>
                        Modyfikuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}