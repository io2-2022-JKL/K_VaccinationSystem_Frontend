import { Link } from "react-router-dom";
import { DoctorLoginPage } from "./DoctorLoginPage";
import { isUserLoggedIn } from "../App";

export function DoctorPage() {
    if (isUserLoggedIn()) {
        return (
        <>
            <main>
                <h2>Strona lekarza</h2>
            </main>
            <nav>
                <Link to="/doctor/login">Logowanie</Link>
            </nav>
        </>
    )
}
return DoctorLoginPage();
}