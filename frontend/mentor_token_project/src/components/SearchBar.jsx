import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import "./SearchBar.css"

const SearchBar = ({ placeholder }) => {
    return (
        <div className="search-bar">
<FontAwesomeIcon icon={faSearch} className="search-icon"/>
<input type="text"
className="search-input"
placeholder={placeholder} />
        </div>
    )
};

export default SearchBar;