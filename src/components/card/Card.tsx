// src/components/Card.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Card as CardType } from "../../types/Card";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { RootState } from "../../store";

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const dispatch = useDispatch();
  const { favoriteCards } = useSelector((state: RootState) => state.favorites);
  const isFavorited = favoriteCards.some(
    (favoriteCard) => favoriteCard.cardId === card.cardId
  );

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to the card's onClick
    dispatch(toggleFavorite(card));
  };

  return (
    <div className="card" onClick={() => onClick(card)}>
      <div className="card-img-container">
        <FontAwesomeIcon
          icon={isFavorited ? faStar : faStarHalfAlt}
          className="favorite-icon"
          onClick={handleFavoriteToggle}
          style={{ color: isFavorited ? "gold" : "gray", position: "sticky" }}
        />
        <img className="card-img" src={card.normalImageUri} alt={card.name} />
      </div>
    </div>
  );
};

export default Card;
