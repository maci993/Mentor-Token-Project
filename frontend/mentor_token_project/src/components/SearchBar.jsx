import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = ({ placeholder, onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (onSearch) {
      onSearch(newQuery);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = event.target.value;
      if (onSearch) {
        onSearch(query);
      }
    }
  };

  return (
    <div className={`search-bar ${className}`}>
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
