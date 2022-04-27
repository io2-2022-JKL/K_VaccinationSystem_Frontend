import { useEffect, useMemo, useState } from "react";
import React from "react";
import Pagination from "./Pagination";
import Filter from "./Filtering";

export default function Table(props) {
    
    const list = props.list;
    const columns = Object.keys(list[0]);

    const [active, setActive] = useState(1);
    const [filters, setFilters] = useState({});
    const filtered = useMemo(() => Filter(list, filters), [list, filters]);
    const rows = 2;
    const totalRows = useMemo(() => filtered.length);
    const pages =  useMemo(() => Math.ceil(totalRows / rows));
    const pageList =  useMemo(() => filtered.slice((active - 1) * rows, active * rows));

    return (
        <div className="fullTable">
            <table className="table">
                <thead>
                    <tr>
                        {
                            columns.map(name => {
                                return <th key={name}>{name}</th>
                            })
                        }
                    </tr>
                    <tr>
                        {
                            columns.map(name => {
                                return (
                                    <th className="searchLine">
                                        <input className="searchBar"
                                            key={`${name}-search`}
                                            placeholder={`Wyszukaj ${name}`}
                                            type="search"
                                            onChange={event => {
                                                const value = event.target.value;
                                                setActive(1);
                                                if (value) {
                                                    setFilters(prevFilters => ({
                                                        ...prevFilters,
                                                        [name]: value,
                                                    }))
                                                }
                                                else {
                                                    setFilters(prevFilters => {
                                                        const updatedFilters = { ...prevFilters };
                                                        delete updatedFilters[name];
                                                        return updatedFilters
                                                    })
                                                }
                                            }}
                                        />
                                    </th>
                                )
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
                                        columns.map(name => {
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