import {PatientMenu} from "./PatientMenu";

export function PatientLayout(props) {
    return (
        <>
            <PatientMenu/>
            {props.content}
        </>
    )
}