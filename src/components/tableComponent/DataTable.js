// Najbardziej "zewnetrzna" funkcja, nalezy jej uzywac podczas tworzenia tabel

import { useEffect, useState } from "react";
import React from "react";
import Table from "./Table";

export default function DataTable(props) {
    return (
        <Table list={props.list}/>
    )
}
