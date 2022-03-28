import {Link} from "react-router-dom";

export function DoctorLoginPage() {
    return (
        <>
            <h2> Strona logowania lekarza </h2>
            <Link to="/doctor/dashboard">Logowanie</Link>
        </>

    )
}