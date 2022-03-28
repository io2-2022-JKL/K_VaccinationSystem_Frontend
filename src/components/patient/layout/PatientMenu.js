import {Link} from "react-router-dom";

export function PatientMenu() {
    return (
        <>
            <main>
                <h2>Menu pacjent</h2>
            </main>
            <nav>
                <Link to="/patient/dashboard">Moje konto</Link> <br />
                <Link to="/patient/signup">Zapisz się</Link> <br />
                <Link to="/patient/certifications">Moje certyfikaty</Link> <br />
                <Link to="/patient/history">Historia</Link> <br />
                <Link to="/patient/planned">Zaplanowane wizyty</Link> <br />
                <Link to="/patient/login">Logowanie</Link> <br />
            </nav>
        </>
    )

}