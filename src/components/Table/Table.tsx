import { capitalize } from "../../utils/stringUtils";

import type { Equipment } from "../../types/EquipmentTypes";

import './Table.css'


interface TableProps {
    data: Equipment[],
    sortBy: string,
    sortOrder: "ASC" | "DESC",
    headers: string[],
    onSort: (value: string) => void
}

export const Table = ({ data, sortBy, sortOrder, headers, onSort }: TableProps) => {

    const rows = Array.isArray(data) ? data : [data];
    
    return (
        <table >
            <thead >
                <tr>
                    {headers.map((header) => (
                        <th key={header}>
                            <button
                            type="button"
                            onClick={(e) => onSort(header)}
                            className="header-btn">
                                {capitalize(header)}
                                {sortBy === header ? (sortOrder === "ASC" ? "▲" : "▼") : "⇅"}
                            </button>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers.map((header) => (
                            <td key={header}>
                                {row[header as keyof Equipment]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
