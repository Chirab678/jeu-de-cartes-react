import React, { useState } from 'react';

// Composant Card avec boutons UPDATE et DELETE
function Card({ card, isSelected, onClick, onEdit, onDelete, isEditing, onSave, onCancelEdit }) {
  const [editContent, setEditContent] = useState(card.content);

  const handleSave = () => {
    if (editContent.trim()) {
      onSave(card.id, editContent.trim());
    }
  };

  const handleCancel = () => {
    setEditContent(card.content);
    onCancelEdit();
  };

  return (
    <div 
      className={`card ${isSelected ? 'card-selected' : ''}`} 
      onClick={() => !isEditing && onClick(card.id)}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="card-input"
            style={{ 
              width: '100%', 
              marginBottom: '10px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={(e) => { e.stopPropagation(); handleSave(); }}
              className="add-button"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              Sauvegarder
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleCancel(); }}
              className="add-button"
              style={{ 
                padding: '8px 16px', 
                fontSize: '0.9rem',
                backgroundColor: '#dc2626',
                ':hover': { backgroundColor: '#b91c1c' }
              }}
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="card-title">{card.content}</h2>
          <p className="card-id">ID: {card.id}</p>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '15px',
            justifyContent: 'center'
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(card.id); }}
              className="add-button"
              style={{ 
                padding: '6px 12px', 
                fontSize: '0.8rem',
                backgroundColor: '#f59e0b'
              }}
            >
              Modifier
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(card.id); }}
              className="add-button"
              style={{ 
                padding: '6px 12px', 
                fontSize: '0.8rem',
                backgroundColor: '#dc2626'
              }}
            >
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;