import {Link} from "react-router-dom";
import useLogin from "../../logic/useLogin";

export default function AdminLoginPage() {
    const {LogIn} = useLogin();
    const SubmitLogIn = () => {
        console.log("abba");
        LogIn("token", "admin")
    }
    return (
        <>
            <h2> Strona logowania admina </h2>
            <button onClick={SubmitLogIn}>Log In</button>
        </>

    )
}