import useLogin from "../../logic/useLogin";
import "../../styles/global.css";
import {useState} from "react";

export default function AdminLoginPage() {
    const {LogIn} = useLogin();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    const SubmitLogIn = () => {
        LogIn(password, "admin")
    }
    return (
        <section className="form animated flipInX">
            <h2>Zaloguj się</h2>
            <form className="loginbox" autoComplete="off" onSubmit={SubmitLogIn}>
                <input placeholder="Email" type="text" id="username" onChange={(e) => {setLogin(e.target.value)}}/>
                <input placeholder="Hasło" type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                <button id="submit">Zaloguj</button>
            </form>
        </section>
    )
}