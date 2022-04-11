import { useEffect, useState } from "react";
import React from "react";

export default function DataTable(props) {
    
    const list = props.list;
    if (list.length == 0) return (<div></div>)

    return (
        <table>
            <thead>
                <tr>
                    {
                        Object.keys(list[0]).map(name => {
                            return <th key={name}>{name}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    list.map(object => {
                        return (
                            <tr>
                                {
                                    Object.keys(list[0]).map(name => {
                                        return <td key={name}>{object[name]}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
