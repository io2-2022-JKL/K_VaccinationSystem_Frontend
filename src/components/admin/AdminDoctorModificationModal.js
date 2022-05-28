import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {useEffect, useState} from 'react';
import { Button } from "@mui/material";
import theme from "assets/theme";
import {modalStyle} from "../../styles/modal.css";
import "../../styles/global.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ApiConnection from "../../logic/api/ApiConnection";
import { TextField } from '@mui/material';


export function AdminDoctorModificationModal(props) {

    const [open, setOpen] = useState(false);
    const [center, setCenter] = useState('');
    const [data, setData] = useState([]);
    let firstName = props.data.firstName;
    let lastName = props.data.lastName;
    let PESEL = props.data.pesel;
    let mail = props.data.mail;
    let phoneNumber = props.data.phoneNumber;

    const instance = ApiConnection("/admin/doctors/modifyDoctor");

    const handleFirstName = (event) => firstName = event.target.value;
    const handleLastName = (event) => lastName = event.target.value;
    const handlePesel = (event) => PESEL = event.target.value;
    const handleMail = (event) => mail = event.target.value;
    const handlePhoneNumber = (event) => phoneNumber = event.target.value;

    const handleClose = () => {
        console.log(props.centers)
        setOpen(false);
    }

    const style = modalStyle()

    const handleChange = (event) => {
        setCenter(event.target.value);
      };

    const editDoctor = () =>
    {
        instance.post(
            "/admin/doctors/editDoctor", {
                "doctorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "pesel": "string",
                "firstName": "string",
                "lastName": "string",
                "mail": "string",
                "dateOfBirth": "2022-05-28T18:12:20.092Z",
                "phoneNumber": "string",
                "active": true,
                "vaccinationCenterID": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })

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
                    <TextField id="first_name" label="Imię" variant="standard" defaultValue={firstName} onChange={handleFirstName}/>
                    <TextField id="last_name" label="Nazwisko" variant="standard" defaultValue={lastName} onChange={handleLastName}/>
                    <TextField id="pesel" label="PESEL" variant="standard" defaultValue={PESEL} onChange={handlePesel}/>
                    <TextField id="mail" label="Mail" variant="standard" defaultValue={mail} onChange={handleMail}/>
                    <TextField id="phone_number" label="Nr Telefonu" variant="standard" defaultValue={phoneNumber} onChange={handlePhoneNumber}/>
                </Box>
                <Button onClick={() => editDoctor()}>
                        Modyfikuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}