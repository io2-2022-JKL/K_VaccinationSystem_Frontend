import {Link} from "react-router-dom";

export default function DoctorMenu() {
    return (
        <>
            <main>
                <h2>Menu doctor</h2>
            </main>
            <nav>
                <Link to="/doctor/dashboard">Moje konto</Link> <br />
                <Link to="/doctor/availability">Godziny dostępności</Link> <br />
                <Link to="/doctor/planned">Zaplanowane wizyty</Link> <br />
                <Link to="/doctor/annulment">Przesze niepotwierdzone wizyty</Link> <br />
                <Link to="/doctor/history">Historia</Link> <br />
                <Link to="/doctor/login">Logowanie</Link> <br />
            </nav>
        </>
    )

}