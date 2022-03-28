import {Link} from "react-router-dom";

export function PatientLoginPage() {
    return (
        <>
            <h2> Strona logowania pacjenta </h2>
            <Link to="/patient/dashboard">Zaloguj</Link>
        </>

    )
}