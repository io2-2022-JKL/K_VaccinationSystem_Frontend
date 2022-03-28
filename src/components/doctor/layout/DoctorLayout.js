import {DoctorMenu} from "./DoctorMenu";

export function DoctorLayout(props) {
    return (
        <>
            <DoctorMenu/>
            {props.content}
        </>
    )
}