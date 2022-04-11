import AuthService from "./api/Services/AuthService";
import useLogin from "./useLogin";
import {useNavigate} from "react-router-dom";

const userAuth = async (login, password) => {
    const userCredentials = {
        "email": login,
        "password": password
    }
    const navigate = useNavigate();
    useLogin()
    try {
        const response = await AuthService.logIn(userCredentials);
        navigate(window.location.href);
    } catch (e) {
        console.error(e)
    }
}