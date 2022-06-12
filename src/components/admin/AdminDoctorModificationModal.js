import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";
import { modalStyle } from "../../styles/modal.css";
import "../../styles/global.css"
import MenuItem from '@mui/material/MenuItem';
import ApiConnection from "../../logic/api/ApiConnection";
import { TextField } from '@mui/material';


export function AdminDoctorModificationModal(props) {

    const [open, setOpen] = useState(false);

    let firstName = props.data.firstName;
    let lastName = props.data.lastName;
    let pesel = props.data.PESEL;
    let mail = props.data.mail;
    let phoneNumber = props.data.phoneNumber;
    let id = props.data.id;
    let dateOfBirth = props.data.dateOfBirth.slice(6,10)+props.data.dateOfBirth.slice(2,6)+props.data.dateOfBirth.slice(0,2);
    let active = props.data.active;
    let vaccinationCenterID = props.data.vaccinationCenterId;

    const instance = ApiConnection("/admin/doctors/modifyDoctor");

    const handleFirstName = (event) => firstName = event.target.value;
    const handleLastName = (event) => lastName = event.target.value;
    const handlePesel = (event) => pesel = event.target.value;
    const handleMail = (event) => mail = event.target.value;
    const handlePhoneNumber = (event) => phoneNumber = event.target.value;
    const handleCenter = (event) => vaccinationCenterID = event.target.value;
    const handleDateOfBirth = (event) => dateOfBirth = event.target.value + 'T00:00:00.000Z';

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    const editDoctor = async (id, pesel, firstName, lastName, mail, dateOfBirth, phoneNumber, active, vaccinationCenterID) =>
    {
        await instance.post(
            "/admin/doctors/editDoctor", {
                "doctorId": id,
                "pesel": pesel,
                "firstName": firstName,
                "lastName": lastName,
                "mail": mail,
                "dateOfBirth": dateOfBirth.slice(8)+dateOfBirth.slice(4,8)+dateOfBirth.slice(0,4),
                "phoneNumber": phoneNumber,
                "active": active,
                "vaccinationCenterID": vaccinationCenterID
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })

        console.log(vaccinationCenterID)
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
                        fullWidth
                            label="Centrum szczepień"
                            id="select-center"
                            defaultValue={vaccinationCenterID}
                            onChange={handleCenter}
                            select
                            variant="standard"
                            >
                            {props.centers.map((record) => (
                                <MenuItem key={record.id} value={record.id}>{record.name}, {record.street}, {record.city}
                                </MenuItem>
                                 ))}
                        </TextField>
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
                <Button onClick={() => editDoctor(id, pesel, firstName, lastName, mail, dateOfBirth, phoneNumber, active, vaccinationCenterID)}>
                        Modyfikuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}