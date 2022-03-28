import {Link} from "react-router-dom";

export function AdminMenu() {
    return (
        <>
            <main>
                <h2>Menu admin</h2>
            </main>
            <nav>
                <Link to="/admin/doctors">Lekarze</Link> <br />
                <Link to="/admin/patients">Pacjenci</Link> <br />
                <Link to="/admin/login">Logowanie</Link> <br />
            </nav>
        </>
    )

}