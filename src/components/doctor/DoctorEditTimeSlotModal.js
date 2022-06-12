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

export default function DoctorEditTimeSlotsModal(props) {

    const d = new Date()
    let from = String(d.getFullYear())+"-"+
                ("0"+String(d.getMonth()+1)).slice(-2)+"-"+
                ("0"+String(d.getDate())).slice(-2)+"T"+
                ("0"+String(d.getHours())).slice(-2)+":"+
                ("0"+String(d.getMinutes())).slice(-2);
    let to = String(d.getFullYear())+"-"+
                ("0"+String(d.getMonth()+1)).slice(-2)+"-"+
                ("0"+String(d.getDate())).slice(-2)+"T"+
                ("0"+String(d.getHours())).slice(-2)+":"+
                ("0"+String(d.getMinutes())).slice(-2);

    const {GetId} = useLogin();
    const [open, setOpen] = useState(false);

    const instance = ApiConnection("/doctor/timeSlots/modify");

    const handleFrom = (event) => from = event.target.value;
    const handleTo = (event) => to = event.target.value;

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const editSlots = async ( 
        from, 
        to) =>
    {
        let f = from.slice(8,10)+"-"+from.slice(5,7)+"-"+from.slice(0,4)+" "+from.slice(11,16)
        let t = to.slice(8,10)+"-"+to.slice(5,7)+"-"+to.slice(0,4)+" "+to.slice(11,16)
        await instance.post(
            "/doctor/timeSlots/modify/" + GetId() + "/" + props.data.id, {
                "windowBegin": f,
                "windowEnd": t,
            })
        //handleClose()
        //window.location.reload(false);
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Edytuj</Button>
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
                </Box>
                <Button onClick={() => editSlots(
                    from, 
                    to )}>
                        Edytuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}