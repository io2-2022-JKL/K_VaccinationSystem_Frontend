import DoctorMenu from "./DoctorMenu";

export default function DoctorLayout(props) {
    return (
        <>
            <DoctorMenu/>
            {props.content}
        </>
    )
}