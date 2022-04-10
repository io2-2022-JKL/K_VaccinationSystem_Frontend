import {Link} from "react-router-dom";
import '../../styles/patient/patient.css';

export function PatientLoginPage() {
    return (
        <div>
            <h2> Strona logowania pacjenta </h2>
            <Link to="/patient/dashboard">Zaloguj</Link>
        </div>

    )
}