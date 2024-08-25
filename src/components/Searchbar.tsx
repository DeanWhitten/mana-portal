import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ToolbarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const Searchbar: React.FC<ToolbarProps> = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<any>({});

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };
  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...selectedFilters, [name]: value });
  };

  return (
    <div className="search-container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: "8px" }} />
        </button>
      </div>{" "}
      {/* 
      <div className="filters">
        <select className='selector' name="rarity" onChange={handleFilterChange} >
          <option value="">Select Rarity</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
        </select>
       
      </div>Add more filters as needed */}
    </div>
  );
};

export default Searchbar;
