import React from 'react';
import { Card as CardType } from '../types/Card/Card';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img className='card-img'src={card.normalImageUri} alt={card.name} />
    </div>
  );
};

export default Card;
