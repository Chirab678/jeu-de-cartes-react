import React from 'react';
import { Card } from './Card.jsx';

export function CardList({ cards, selectedCardIds, onCardClick }) {
  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isSelected={selectedCardIds.includes(card.id)}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}