import {Link} from "react-router-dom";

export default function DoctorLoginPage() {
    return (
        <>
            <h2> Strona logowania lekarza </h2>
            <Link to="/doctor/dashboard">Logowanie</Link>
        </>

    )
}