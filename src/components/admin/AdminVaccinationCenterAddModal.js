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
import { KeyboardDoubleArrowRightSharp } from '@mui/icons-material';

export default function AdminVaccinationCenterAddModal(props) {

    let name = "";
    let city = "";
    let street = "";
    let openingHoursDays = [];
    let vaccineIds = [];
    let active = true;

    const [open, setOpen] = useState(false);
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccines, setSelectedVaccines] = useState([])

    const instance = ApiConnection("/admin/vaccinationCenter/addVaccine");

    const handleName = (event) => name = event.target.value;
    const handlecity = (event) => city = event.target.value;
    const handlestreet = (event) => street = event.target.value;

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const addCenter = async ( 
        street, 
        name, 
        city, 
        active) =>
    {
        console.log(props.streetes)
        await instance.post(
            "/admin/vaccines/addVaccine", {
                "street": street,
                "name": name,
                "city": city,
                vaccineIds,
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
                                    <MenuItem value={record.vaccineId}>
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
                            defaultValue={"00:00"} 
                            onChange={(e) => openingHoursDays[0].from=e.target.value}/>
                        <TextField 
                            id="max_days" 
                            label="Poniedziałek do" 
                            variant="standard" 
                            defaultValue={"23:59"} 
                            onChange={(e) => openingHoursDays[0].to=e.target.value}/>
                    </Grid>
                
                </Box>
                <Button onClick={() => addCenter(
                    street, 
                    name, 
                    city, 
                    active)}>
                        Utwórz
                </Button>
            </Box>
        </Modal>
        </>
    )
}