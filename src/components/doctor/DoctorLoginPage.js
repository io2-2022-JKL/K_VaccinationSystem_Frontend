import {Link} from "react-router-dom";
import useLogin from "../../logic/useLogin";

export function DoctorLoginPage() {
    const {LogIn} = useLogin();
    const SubmitLogIn = () => {
        LogIn("token", "doctor")
    }
    return (
        <>
            <h2> Strona logowania admina </h2>
            <button onClick={SubmitLogIn}>Log In</button>
        </>

    )
}