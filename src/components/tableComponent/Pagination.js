import React from "react";

export default function Pagination(props) {

    const start = (props.active - 1) * props.rows + 1;
    let end = start + props.rows - 1;
    if (end > props.totalRows) end = props.totalRows;

    return (
        <div>
            <div className="pagination">
                <button className="paginationButton" disabled={props.active == 1} 
                    onClick={() => props.setActive(1)}> First </button>
                <button className="paginationMiddleButton" disabled={props.active == 1} 
                    onClick={() => props.setActive(props.active - 1)}> Previous </button>
                <p class="nowrap"> Page {props.active} of {props.pages} </p>
                <button className="paginationMiddleButton" disabled={props.active == props.pages} 
                    onClick={() => props.setActive(props.active + 1)}> Next </button>
                <button className="paginationButton" disabled={props.active == props.pages} 
                    onClick={() => props.setActive(props.pages)}> Last </button>
            </div>
        </div>
    )
}