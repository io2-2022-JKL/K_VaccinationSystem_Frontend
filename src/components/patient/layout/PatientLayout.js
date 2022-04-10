import Sidebar from "../sidebar/Sidebar";

export function PatientLayout(props) {
    return (
         <div style={{
            padding: '50px 0px 0px 370px'
        }}>
            <Sidebar/>
            {props.content}
        </div>
    )
}