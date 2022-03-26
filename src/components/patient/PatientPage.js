import { Link } from "react-router-dom";
import { PatientLoginPage } from "./PatientLoginPage";
import { isUserLoggedIn } from "../App";

export function PatientPage() {
    if (isUserLoggedIn()) {
        return (
        <>
            <main>
                <h2>Strona pacjenta</h2>
            </main>
            <nav>
                <Link to="/patient/login">Logowanie</Link>
            </nav>
        </>
    )
}
return PatientLoginPage();
}