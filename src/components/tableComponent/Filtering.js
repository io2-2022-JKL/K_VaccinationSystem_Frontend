import React from "react";

export default function Filter(list, filters) {

    if (Object.keys(filters).length === 0) return list;

    return list.filter(object => {
        return Object.keys(filters).every(column => {
            const value = object[column];
            const searchValue = filters[column];
            if (typeof value == 'string' || value instanceof String) {
                return value.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (typeof value == 'number' && !isNaN(value)) {
                return value == searchValue;
            }
            if (typeof value == 'boolean') {
                return searchValue == value;
            }
            return false;
        })
    })
}