import React, { useEffect, useState } from "react";
import { getFavorites } from "../../utils/indexedDB"; // Import the IndexedDB utility
import CardList from "../card/CardList";
import CardOverlay from "../card/CardOverlay"; // Assuming you have a CardOverlay component
import Pagination from "../Pagination"; // Import your Pagination component
import { Card } from "../../types/Card";
import PageHeader from "../PageHeader";

const FavoritesPage: React.FC = () => {
  const [favoriteCards, setFavoriteCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch favorite cards from IndexedDB
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteCards(favorites);
    };

    fetchFavorites();
  }, []);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCloseOverlay = () => {
    setSelectedCard(null);
  };

  const totalPages = Math.ceil(favoriteCards.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(0); // Reset to the first page when items per page change
  };

  const currentCards = favoriteCards.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="favorites-page img-bg">
      <PageHeader title="Favorites" />
      {favoriteCards.length === 0 ? (
        <p>No favorited cards</p>
      ) : (
        <>
          <CardList cards={currentCards} onCardClick={handleCardClick} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          {selectedCard && (
            <CardOverlay card={selectedCard} onClose={handleCloseOverlay} />
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
