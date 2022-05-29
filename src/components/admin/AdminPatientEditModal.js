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


export default function AdminPatientEditModal(props) {

    const [open, setOpen] = useState(false);

    let firstName = props.data.firstName;
    let lastName = props.data.lastName;
    let pesel = props.data.pesel;
    let mail = props.data.mail;
    let phoneNumber = props.data.phoneNumber;
    let id = props.data.patientId;
    let dateOfBirth = props.data.dateOfBirth;
    let active = props.data.active;

    const instance = ApiConnection("/admin/patients/editPatient");

    const handleFirstName = (event) => firstName = event.target.value;
    const handleLastName = (event) => lastName = event.target.value;
    const handlePesel = (event) => pesel = event.target.value;
    const handleMail = (event) => mail = event.target.value;
    const handlePhoneNumber = (event) => phoneNumber = event.target.value;
    const handleDateOfBirth = (event) => dateOfBirth = event.target.value + 'T00:00:00.000Z';

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const editDoctor = async (id, pesel, firstName, lastName, mail, dateOfBirth, phoneNumber, active, vaccinationCenterID) =>
    {
        await instance.post(
            "/admin/patients/editPatient", {
                "patientId": id,
                "pesel": pesel,
                "firstName": firstName,
                "lastName": lastName,
                "mail": mail,
                "dateOfBirth": dateOfBirth,
                "phoneNumber": phoneNumber,
                "active": active,
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })

        console.log(vaccinationCenterID)
        handleClose()
        //window.location.reload(false);
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
                    Zmodyfikuj dane doktora {props.data.firstName} {props.data.lastName}
                </Typography>
                <Box fullWidth>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth 
                            id="first_name" 
                            label="Imię" 
                            variant="standard" 
                            defaultValue={firstName} 
                            onChange={handleFirstName}/>
                    </Box>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth 
                            id="last_name" 
                            label="Nazwisko" 
                            variant="standard"
                            defaultValue={lastName} 
                            onChange={handleLastName}/>
                    </Box>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth 
                            id="pesel" 
                            label="PESEL" 
                            variant="standard" 
                            defaultValue={pesel} 
                            onChange={handlePesel}/>
                    </Box>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth 
                            id="mail" 
                            label="Mail" 
                            variant="standard" 
                            defaultValue={mail} 
                            onChange={handleMail}/>
                    </Box>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField fullWidth 
                            id="phone_number" 
                            label="Nr Telefonu" 
                            variant="standard" 
                            defaultValue={phoneNumber} 
                            onChange={handlePhoneNumber}/>
                    </Box>
                    <Box fullWidth sx={{pl:4, pr:4, pt:2, pd:2}}>
                        <TextField
                            id="datefrom"
                            label="Data od"
                            type="date"
                            variant="standard"
                            defaultValue={dateOfBirth.slice(0,10)}
                            onChange={handleDateOfBirth}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            />
                    </Box>
                </Box>
                <Button onClick={() => editDoctor(id, pesel, firstName, lastName, mail, dateOfBirth, phoneNumber, active)}>
                        Modyfikuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}