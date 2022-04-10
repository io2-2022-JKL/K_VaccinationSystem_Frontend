import {AdminMenu} from "./AdminMenu";

export default function AdminLayout(props) {
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