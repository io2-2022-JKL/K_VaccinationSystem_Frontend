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

export default function DoctorConfirmModal(props) {

    const {GetId} = useLogin();
    const [open, setOpen] = useState(false);
    const [batchId, setId] = useState("");

    const handleName = (event) => setId(event.target.value);

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const vaccinate = async () =>
    {
        const instance = ApiConnection("/doctor/vaccinate/confirmVaccination/");
        await instance.post(
            "/doctor/vaccinate/confirmVaccination/"+GetId()+"/"+props.data.appointmentId+"/"+batchId, {
            })
        handleClose()
        props.f()
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Potwierdź</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Potwierdź szczepienie
                </Typography>
                <Box fullWidth>
                    <Box fullWidthsx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth
                            id="batchid" 
                            label="BatchId" 
                            variant="standard" 
                            defaultValue={batchId} 
                            onChange={handleName}/>
                    </Box>
                </Box>
                <Button onClick={() => vaccinate()}>
                        Potwierdź
                </Button>
            </Box>
        </Modal>
        </>
    )
}