// components/CardList.tsx
import React from "react";
import Card from "./Card";
import { Card as CardType } from "../../types/Card";

interface CardListProps {
  cards?: CardType[]; // Make cards optional
  onCardClick: (card: CardType) => void; // Add onCardClick prop
}

const defaultCards: CardType[] = []; // Default value for cards

const CardList: React.FC<CardListProps> = ({
  cards = defaultCards,
  onCardClick,
}) => {
  return (
    <div className="card-list">
      {cards.length === 0 ? (
        <p>No cards available</p>
      ) : (
        cards.map((card) => (
          <Card
            key={card.cardId}
            card={card}
            onClick={() => onCardClick(card)}
          />
        ))
      )}
    </div>
  );
};

export default CardList;
