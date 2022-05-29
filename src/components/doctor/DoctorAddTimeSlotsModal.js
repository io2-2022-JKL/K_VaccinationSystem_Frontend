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
import useLogin from 'logic/useLogin';

export default function DoctorAddTimeSlotsModal(props) {

    const d = new Date()
    let from = String(d.getFullYear())+"-"+
                ("0"+String(d.getMonth())).slice(-2)+"-"+
                ("0"+String(d.getDay())).slice(-2)+"T"+
                ("0"+String(d.getHours())).slice(-2)+":"+
                ("0"+String(d.getMinutes())).slice(-2);
    let to = String(d.getFullYear())+"-"+
                ("0"+String(d.getMonth())).slice(-2)+"-"+
                ("0"+String(d.getDay())).slice(-2)+"T"+
                ("0"+String(d.getHours())).slice(-2)+":"+
                ("0"+String(d.getMinutes())).slice(-2);
    let minutes = "3";

    const {GetId} = useLogin();
    const [open, setOpen] = useState(false);

    const instance = ApiConnection("/doctor/timeSlot/create");

    const handleFrom = (event) => from = event.target.value;
    const handleTo = (event) => to = event.target.value;
    const handleMinutes = (event) => minutes = event.target.value;

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const addSlots = async ( 
        from, 
        to, 
        minutes) =>
    {
        let f = from.slice(8,10)+"-"+from.slice(5,7)+"-"+from.slice(0,4)+" "+from.slice(11,16)
        let t = to.slice(8,10)+"-"+to.slice(5,7)+"-"+to.slice(0,4)+" "+to.slice(11,16)
        console.log(f)
        await instance.post(
            "/doctor/timeSlot/create/" + GetId(), {
                "windowBegin": f,
                "windowEnd": t,
                "timeSlotDurationInMinutes": parseInt(minutes)
            })
        console.log(from)
        handleClose()
        window.location.reload(false);
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
                    Dodaj nowe TimeSloty
                </Typography>
                <Box fullWidth>
                    <TextField
                        variant="standard" 
                        id="datefrom"
                        label="Data od"
                        type="datetime-local"
                        defaultValue={from}
                        onChange={handleFrom}
                        InputLabelProps={{
                            shrink: true,
                            }}
                        fullWidth
                        />
                    <TextField
                        variant="standard" 
                        id="dateto"
                        label="Data do"
                        type="datetime-local"
                        defaultValue={to}
                        onChange={handleTo}
                        InputLabelProps={{
                            shrink: true,
                            }}
                        fullWidth
                        />
                    <TextField
                        variant="standard" 
                        id="minutes"
                        label="Czas trwania"
                        defaultValue={minutes}
                        onChange={handleMinutes}
                        fullWidth
                        />
                </Box>
                <Button onClick={() => addSlots(
                    from, 
                    to, 
                    minutes, )}>
                        Utwórz
                </Button>
            </Box>
        </Modal>
        </>
    )
}