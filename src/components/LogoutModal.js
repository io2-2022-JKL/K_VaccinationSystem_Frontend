import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from 'react';
import { Button } from "@mui/material";
import {modalStyle} from "../styles/modal.css"
import "../styles/global.css";
import {useNavigate} from "react-router-dom";
import useLogin from "../logic/useLogin";
import {navbarIconButton} from "examples/Navbars/DashboardNavbar/styles";
import LogoutIcon from '@mui/icons-material/Logout';

export function LogoutModal() {

    const {LogOut} = useLogin();
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
  
    const handleLogout = () => {
      LogOut();
      navigate("/login");
    }

    const handleClose = () => {
        setOpen(false);
    }

    const style = modalStyle()

    return (
        <>
        <Button 
            sx={navbarIconButton} 
            size="small" 
            disableRipple
            onClick={()=>{setOpen(true)}}
            startIcon={<LogoutIcon/>}
            >
                Wyloguj się
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Wylogowywanie
                </Typography>
                <Box sx={{ minWidth: 120, minHeight: 50 }}>
                    Czy napewno chcesz się wylogować?
                </Box>
                <Box sx={{display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,}}>
                <Button onClick={() => handleClose()}>
                        Nie
                </Button>
                <Button onClick={() => handleLogout()}>
                        Tak
                </Button>
                </Box>
            </Box>
        </Modal>
        </>
    )
}