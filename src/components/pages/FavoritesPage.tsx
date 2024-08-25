import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CardList from "../CardList";
import { Card } from "../../types/Card";

const FavoritesPage: React.FC = () => {
  // Get the list of favorited cards from the Redux state
  const { favoriteCards } = useSelector((state: RootState) => state.favorites);

  return (
    <div className="favorites-page">
      <h2 style={{ position: "sticky" }}>Favorited Cards</h2>
      {favoriteCards.length === 0 ? (
        <p>No favorited cards</p>
      ) : (
        <CardList
          cards={favoriteCards}
          onCardClick={() => {
            /* Implement card click logic */
          }}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
