import {Link} from "react-router-dom";

export function AdminMenu() {
    return (
        <>
            <main>
                <h2>Menu admin</h2>
            </main>
            <nav>
                <Link to="/admin/login">Logowanie</Link>
            </nav>
        </>
    )

}