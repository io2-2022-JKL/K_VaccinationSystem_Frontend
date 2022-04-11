import { useState } from "react";
import DataTable from "../DataTable";

export default function PatientVaccinationSignUp() {

    const [visits, setVisits] = useState([
        {
            Data: "12.04.2022",
            Godzina: "13:10",
            Miejsce: "Centrum Szczepień na Koszykowej",
            Szczepionka: "Covid"
        },
        {
            Data: "15.04.2022",
            Godzina: "12:00",
            Miejsce: "Centrum 8",
            Szczepionka: "losowa"
        }
    ])

    return (
        <div className='pageNameSeparator'>
            <h2> Zapisz się </h2>
            <DataTable list={visits}/>
        </div>
    )
}