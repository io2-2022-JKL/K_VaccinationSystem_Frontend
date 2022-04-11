import { useState } from "react";
import DataTable from "../DataTable";

export default function PatientCertifications() {

    const [certs, setCerts] = useState([
        {
            Szczepionka: "covid",
            Od: "11.04.2022",
            Do: "11.05.2022"
        },
        {
            Szczepionka: "grypa",
            Od: "10.04.2022",
            Do: "10.04.2122"
        },
        {
            Szczepionka: "świńska grypa",
            Od: "6.10.2010",
            Do: "27.12.2024"
        }
    ]);

    return (
        <>
            <h2> Certyfikaty pacjenta </h2>
            <DataTable list={certs}/>
        </>
    )
}