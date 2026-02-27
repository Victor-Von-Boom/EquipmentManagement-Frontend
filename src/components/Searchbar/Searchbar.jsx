import React from "react";
import { useState, useEffect } from "react";


import './Searchbar.css'

export const Searchbar = ({ search, onSearch }) => {

    const [localInput, setLocalInput] = useState(search || "");

    useEffect(() => {
        setLocalInput(search);
    }, [search]);

    return (
        <form className="searchbar-form" onSubmit={(e) => {
            e.preventDefault();
            onSearch(localInput);
        }}>
            <input type="search" value={localInput} placeholder="Search" onChange={(e) => {
                setLocalInput(e.target.value);
            }} />
            <button type="submit" className="btn">Submit</button>
        </form>
    );
}

// export default Searchbar;