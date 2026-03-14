import { useState, useEffect } from "react";

import './Searchbar.css'

interface SearchProps {
    search: string,
    onSearch: (value: string) => void
}

export const Searchbar = ({ search, onSearch }: SearchProps) => {

    const [localInput, setLocalInput] = useState(search || "");

    useEffect(() => {
        setLocalInput(search);
    }, [search]);

    return (
        <form className="searchbar-form" onSubmit={(e) => {
            e.preventDefault();
            onSearch(localInput);
        }}>
            <input className="searchbar-input" type="search" value={localInput} placeholder="Search" onChange={(e) => {
                setLocalInput(e.target.value);
            }} />
            <button type="submit" className="btn">Submit</button>
        </form>
    );
}
