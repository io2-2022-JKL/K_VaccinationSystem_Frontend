import { Link } from "react-router-dom";
import { AdminLoginPage } from "./AdminLoginPage";
import { isUserLoggedIn } from "../App";

export function AdminPage() {
    if (isUserLoggedIn()) {
            return (
            <>
                <main>
                    <h2>Strona admina</h2>
                </main>
                <nav>
                    <Link to="/admin/login">Logowanie</Link>
                </nav>
            </>
        )
    }
    return AdminLoginPage();
}