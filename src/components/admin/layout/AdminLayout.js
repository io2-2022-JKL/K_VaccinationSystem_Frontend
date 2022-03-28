import {AdminMenu} from "./AdminMenu";

export function AdminLayout(props) {
        return (
            <>
                <main>
                    <h2>Admin layout</h2>
                </main>
                <AdminMenu />
                {props.content}
            </>
        )
}