import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { CardFilter } from "../types/CardFilter"; // Import the CardFilter type

interface ToolbarProps {
  onSearch: (query: string, filters: CardFilter) => void; // Update function signature
  onFilterChange: (filters: CardFilter) => void; // Update function signature
}

const Searchbar: React.FC<ToolbarProps> = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<CardFilter>({ colors: [] });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm, selectedFilters); // Pass filters with search query
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "colors") {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      const updatedFilters = { ...selectedFilters, colors: selectedOptions };
      setSelectedFilters(updatedFilters);
      onFilterChange(updatedFilters); // Notify parent about the filter change
    } else {
      const updatedFilters = { ...selectedFilters, [name]: value };
      setSelectedFilters(updatedFilters);
      onFilterChange(updatedFilters); // Notify parent about the filter change
    }
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
      </div>

      <div className="filters">
        <select
          className="selector"
          name="rarity"
          value={selectedFilters.rarity || ""}
          onChange={handleFilterChange}
        >
          <option value="">Select Rarity</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
        </select>
        <select
          className="selector"
          name="colors"
          multiple
          value={selectedFilters.colors || []}
          onChange={handleFilterChange}
        >
          <option value="w">White</option>
          <option value="bl">Blue</option>
          <option value="b">Black</option>
          <option value="r">Red</option>
          <option value="g">Green</option>
          <option value="u">Colorless</option>
        </select>
        {/* Add more filters here if needed */}
      </div>
    </div>
  );
};

export default Searchbar;

