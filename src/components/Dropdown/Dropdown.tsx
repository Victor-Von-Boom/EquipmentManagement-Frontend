import { capitalize } from "../../utils/stringUtils";

import "./Dropdown.css"

interface DropdownProps {
    selectedCategory: string,
    categories: string[],
    onSelect: (value: string) => void
}


export const Dropdown = ({ selectedCategory, categories, onSelect }: DropdownProps) => {
    return (
        <select className="dashboard" value={selectedCategory} onChange={(e) => onSelect(e.target.value)} >
            {categories.map((category) => (
                <option key={category} value={category}>
                    {capitalize(category)}
                </option>
            ))}
        </select>
    );
}
