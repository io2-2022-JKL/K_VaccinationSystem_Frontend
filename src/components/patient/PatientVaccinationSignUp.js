import { useState } from "react";
import DataTable from "../tableComponent/DataTable";

export default function PatientVaccinationSignUp() {

    const [visits, setVisits] = useState([
        {
            Data: "12.04.2022",
            Godzina: "13:10",
            Miejsce: "Centrum Szczepień na Koszykowej",
            Szczepionka: "Covid",
            Zapisz: <button>Zapisz się</button>
        },
        {
            Data: "15.04.2022",
            Godzina: "12:00",
            Miejsce: "Centrum 8",
            Szczepionka: "losowa",
            Zapisz: <button>Zapisz się</button>
        }
    ])

    return (
        <div className='namePageSeparator'>
            <h2> Zapisz się </h2>
            <DataTable list={visits}/>
        </div>
    )
}