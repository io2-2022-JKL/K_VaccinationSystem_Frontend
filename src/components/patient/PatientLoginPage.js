import {Link} from "react-router-dom";
import '../../styles/patient/patient.css';
import useLogin from "../../logic/useLogin";

export default function PatientLoginPage() {
    const {LogIn} = useLogin();
    const SubmitLogIn = () => {
        LogIn("token", "patient")
    }
    return (
        <>
            <h2> Strona logowania pacjenta </h2>
            <button onClick={SubmitLogIn}>Log In</button>
        </>

    )
}