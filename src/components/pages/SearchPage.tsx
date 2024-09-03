import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../features/cards/cardsSlice";
import { RootState } from "../../store";
import CardList from "../card/CardList";
import Pagination from "./../Pagination";
import { Dispatch } from "@reduxjs/toolkit";
import CardDetailsOverlay from "./../card/CardOverlay"; // Import the CardDetailsOverlay component
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../../types/Card";
import Searchbar from "./../Searchbar";
import PageHeader from "../PageHeader";

const CardPage: React.FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { cards, totalElements } = useSelector(
    (state: RootState) => state.cards
  );
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("page") ? parseInt(params.get("page")!, 10) : 0;
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    dispatch(fetchCards({ page, size: itemsPerPage, search: searchQuery }));
  }, [dispatch, page, itemsPerPage, searchQuery, filters]);

  useEffect(() => {
    navigate({ search: `?page=${page}` });
  }, [page, navigate]);

  const totalPages = Math.ceil(totalElements / itemsPerPage);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCloseOverlay = () => {
    setSelectedCard(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(0); // Reset to the first page on search
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(0); // Reset to the first page on filter change
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(0); // Reset to the first page when items per page change
  };

  return (
    <div className="search-page img-bg">
      <PageHeader title="Browse" />
      <Searchbar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      {cards.length === 0 ? (
        <p>No cards available</p>
      ) : (
        <CardList cards={cards} onCardClick={handleCardClick} />
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      {selectedCard && (
        <CardDetailsOverlay card={selectedCard} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

export default CardPage;
