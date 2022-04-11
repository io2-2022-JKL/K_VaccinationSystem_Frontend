import { useState } from "react";
import DataTable from "../DataTable";

export default function PatientHistory() {

    const [history, setHistory] = useState([
        {
            Data: "10.02.2022",
            Szczepionka: "covid",
            Odbyto: "tak"
        },
        {
            Data: "2.02.2002",
            Szczepionka: "przeziębienie",
            Odbyto: "tak"
        },
        {
            Data: "1.02.2022",
            Szczepionka: "przeziębienie",
            Odbyto: "nie"
        }
    ])

    return (
        <div>
            <div className="namePageSeparator">
                <h2>
                    Historia Szczepień
                </h2>
            </div>
            <DataTable list={history}/>
        </div>
    )
}