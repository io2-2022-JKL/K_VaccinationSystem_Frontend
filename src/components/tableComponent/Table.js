import { useEffect, useState } from "react";
import React from "react";
import Pagination from "./Pagination";

export default function Table(props) {
    
    const list = props.list;

    const [active, setActive] = useState(1);
    const rows = 2;
    const totalRows = list.length;
    const pages = Math.ceil(totalRows / rows);
    const pageList = list.slice((active - 1) * rows, active * rows);

    if (list.length == 0) return (<div></div>)

    return (
        <div className="fullTable">
            <table className="table">
                <thead>
                    <tr>
                        {
                            Object.keys(pageList[0]).map(name => {
                                return <th key={name}>{name}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        pageList.map(object => {
                            return (
                                <tr>
                                    {
                                        Object.keys(pageList[0]).map(name => {
                                            return <td key={name}>{object[name]}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Pagination active={active} setActive={setActive} rows={rows} totalRows={totalRows} pages={pages}/>
        </div>
    )
}