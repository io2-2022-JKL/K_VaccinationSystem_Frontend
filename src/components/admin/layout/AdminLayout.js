import AdminMenu from "./AdminMenu";
import {Outlet} from "react-router-dom";
import useLogin from "../../../logic/useLogin";

export default function AdminLayout(props) {
    return (
        <>
            <main>
                <h2>Admin layout</h2>
            </main>
            <AdminMenu/>
            <Outlet/>
        </>
    )
}