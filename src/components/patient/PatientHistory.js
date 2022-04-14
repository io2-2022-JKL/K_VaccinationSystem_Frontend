import { useState } from "react";
import DataTable from "../tableComponent/DataTable";

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
        },
        {
            Data: "21.01.2022",
            Szczepionka: "świńska grypa",
            Odbyto: "tak"
        },
        {
            Data: "1.01.2022",
            Szczepionka: "noworoczna choroba wysokoprocentowa",
            Odbyto: "tak"
        }
    ])
    return (
        <>
            <div className="namePageSeparator">
                <h2>
                    Historia Szczepień
                </h2>
                <DataTable list={history}/>
            </div>
        </>
    )
}