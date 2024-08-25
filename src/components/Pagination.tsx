import React, { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const [inputPage, setInputPage] = useState(currentPage + 1);

  useEffect(() => {
    setInputPage(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pageNumber = parseInt(event.target.value, 10);
    if (!isNaN(pageNumber)) {
      setInputPage(pageNumber);
    }
  };

  const handlePageInputSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const newPage = inputPage - 1;
      if (newPage >= 0 && newPage < totalPages) {
        onPageChange(newPage);
      } else {
        setInputPage(currentPage + 1); // Reset the input to the current page if out of bounds
      }
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 0}
      >
        Previous
      </button>

      <input
        type="number"
        value={inputPage}
        onChange={handlePageInputChange}
        onKeyDown={handlePageInputSubmit}
        style={{ width: "50px", textAlign: "center", margin: "0 8px" }}
      />
      <span>{`of ${totalPages}`}</span>

      <button
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>

      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        style={{ marginLeft: "16px" }}
      >
        {[5, 10, 15, 20, 25, 50].map((value) => (
          <option key={value} value={value}>{`${value} per page`}</option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
