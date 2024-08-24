import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../features/cards/cardsSlice';
import { RootState } from '../store';
import CardList from './CardList';
import Pagination from './Pagination';
import { Dispatch } from '@reduxjs/toolkit';
import CardDetailsOverlay from './CardOverlay'; // Import the CardDetailsOverlay component
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../types/Card/Card';
import Searchbar from './Searchbar';

const CardPage: React.FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { cards, totalElements, pageSize } = useSelector((state: RootState) => state.cards);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('page') ? parseInt(params.get('page')!, 10) : 0;
  });
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // State for the selected card
  const [itemsPerPage, setItemsPerPage] = useState(10); // State to manage the number of items per page

  useEffect(() => {
    console.log('Fetching cards with page:', page, 'size:', pageSize); // Log fetching
    dispatch(fetchCards({ page, size: itemsPerPage }));
  }, [dispatch, page, itemsPerPage]);

  useEffect(() => {
    navigate({ search: `?page=${page}` }); // Update URL with new page
  }, [page, navigate]);

  useEffect(() => {
    dispatch(fetchCards({ page, size: itemsPerPage, search: searchQuery }));
  }, [dispatch, page, itemsPerPage, searchQuery, filters]);

  const totalPages = itemsPerPage && totalElements ? Math.ceil(totalElements / itemsPerPage) : 0;

  const handleCardClick = (card: Card) => {
    setSelectedCard(card); // Set the selected card
  };

  const handleCloseOverlay = () => {
    setSelectedCard(null); // Close the overlay
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
    <div className="search-page">
      <Searchbar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      {cards.length === 0 ? <p>No cards available</p> : <CardList cards={cards} onCardClick={handleCardClick} />}
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      {selectedCard && <CardDetailsOverlay card={selectedCard} onClose={handleCloseOverlay} />}
    </div>
  );
};

export default CardPage;


