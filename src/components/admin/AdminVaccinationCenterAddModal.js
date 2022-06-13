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

export default function AdminVaccinationCenterAddModal(props) {

    let openingHoursDays = [
        {
            from: "00:00",
            to: "23:59"
        },
        {
            from: "00:00",
            to: "23:59"
        },
        {
            from: "00:00",
            to: "23:59"
        },
        {
            from: "00:00",
            to: "23:59"
        },
        {
            from: "00:00",
            to: "23:59"
        },
        {
            from: "00:00",
            to: "23:59"
        },
        {
            from: "00:00",
            to: "23:59"
        },
    ];
    let active = true;

    const [open, setOpen] = useState(false);
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccines, setSelectedVaccines] = useState([])
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    const instance = ApiConnection("/admin/vaccinationCenters/addVaccinationCenter");

    const handleName = (event) => setName(event.target.value);
    const handlecity = (event) => setCity(event.target.value);
    const handlestreet = (event) => setStreet(event.target.value);

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    let addCenter = async () =>
    {
        await instance.post(
            "/admin/vaccinationCenters/addVaccinationCenter", {
                "street": street,
                "name": name,
                "city": city,
                "vaccineIds": selectedVaccines,
                openingHoursDays,
                "active": active,
            })
        handleClose()
        window.location.reload(false);
    }

    const instanceVaccines = ApiConnection("/admin/vaccines")

    const onEnter = async () =>
    {
        const v = await instanceVaccines.get("/admin/vaccines")
        v.data = v.data.filter(function(el,index,arr){
            return el.active;
        })
        setVaccines(v.data)
        setOpen(true)
    }

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setSelectedVaccines(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return (
        <>
        <Button onClick={onEnter}>Utwórz</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Dodaj nowe centrum szczepień
                </Typography>
                <Box fullWidth>
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
                            id="city" 
                            label="Miasto" 
                            variant="standard"
                            defaultValue={city} 
                            onChange={handlecity}/>
                    </Box>
                    <Box fullWidthsx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="street" 
                            label="Ulica" 
                            variant="standard"
                            defaultValue={street} 
                            onChange={handlestreet}/>
                    </Box>
                    <Box fullWidthsx={{pl:4, pr:4, pt:2, pd:2}}>
                        <Select fullWidth
                            id="szczepionki" 
                            label="Szczepionki" 
                            variant="standard"
                            defaultValue={[]}
                            multiple 
                            onChange={handleChange}>
                                {vaccines.map((record) => (
                                    <MenuItem 
                                        key={record.vaccineId} 
                                        value={record.vaccineId}
                                    >
                                        {record.name}
                                    </MenuItem>
                                    ))}
                        </Select>
                    </Box>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Poniedziałek od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[0].from} 
                            onChange={(e) => openingHoursDays[0].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Poniedziałek do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[0].to} 
                            onChange={(e) => openingHoursDays[0].to=e.target.value}/>
                    </Grid>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Wtorek od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[1].from} 
                            onChange={(e) => openingHoursDays[1].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Wtorek do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[1].to} 
                            onChange={(e) => openingHoursDays[1].to=e.target.value}/>
                    </Grid>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Środa od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[2].from} 
                            onChange={(e) => openingHoursDays[2].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Środa do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[2].to} 
                            onChange={(e) => openingHoursDays[2].to=e.target.value}/>
                    </Grid>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Czwartek od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[3].from} 
                            onChange={(e) => openingHoursDays[3].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Czwartek do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[3].to} 
                            onChange={(e) => openingHoursDays[3].to=e.target.value}/>
                    </Grid>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Piątek od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[4].from} 
                            onChange={(e) => openingHoursDays[4].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Piątek do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[4].to} 
                            onChange={(e) => openingHoursDays[4].to=e.target.value}/>
                    </Grid>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Sobota od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[5].from} 
                            onChange={(e) => openingHoursDays[5].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Sobota do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[5].to} 
                            onChange={(e) => openingHoursDays[5].to=e.target.value}/>
                    </Grid>
                    <Grid  sx={{pl:4, pr:4, pt:2, pd:2}} container>
                        <TextField 
                            id="min_days" 
                            label="Niedziela od" 
                            variant="standard" 
                            defaultValue={openingHoursDays[6].from} 
                            onChange={(e) => openingHoursDays[6].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Niedziela do" 
                            variant="standard" 
                            defaultValue={openingHoursDays[6].to} 
                            onChange={(e) => openingHoursDays[6].to=e.target.value}/>
                    </Grid>
                </Box>
                <Button onClick={() => addCenter()}>
                        Utwórz
                </Button>
            </Box>
        </Modal>
        </>
    )
}