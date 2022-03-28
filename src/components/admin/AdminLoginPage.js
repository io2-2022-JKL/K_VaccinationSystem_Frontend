import {Link} from "react-router-dom";

export function AdminLoginPage() {
    return (
        <>
            <h2> Strona logowania admina </h2>
            <Link to="/admin/patients">Login</Link>
        </>

    )
}