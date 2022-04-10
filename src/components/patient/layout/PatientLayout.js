import {PatientMenu} from "./PatientMenu";

export default function PatientLayout(props) {
    return (
        <>
            <PatientMenu/>
            {props.content}
        </>
    )
}