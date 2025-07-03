import React from 'react';
import Card from './Card.jsx';

function CardList({ cards, selectedCardIds, onCardClick, onEdit, onDelete, editingCardId, onSave, onCancelEdit }) {
  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isSelected={selectedCardIds.includes(card.id)}
          onClick={onCardClick}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditing={editingCardId === card.id}
          onSave={onSave}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
}

export default CardList;