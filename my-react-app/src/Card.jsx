import React from 'react';

export function Card({ card, isSelected, onClick }) {
  return (
    <div 
      className={`card ${isSelected ? 'card-selected' : ''}`} 
      onClick={() => onClick(card.id)}
    >
      <h2 className="card-title">{card.content}</h2>
      <p className="card-id">ID: {card.id}</p>
    </div>
  );
}