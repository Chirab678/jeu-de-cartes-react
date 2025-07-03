import React, { useState } from 'react';
import CardList from './CardList.jsx';
import './App.css';

function App() {
  // État pour gérer la liste des cartes
  const [cards, setCards] = useState([
    { id: 1, content: 'Carte 1' },
    { id: 2, content: 'Carte 2' },
    { id: 3, content: 'Carte 3' },
    { id: 4, content: 'Carte 4' }
  ]);

  // État pour gérer les identifiants des cartes sélectionnées
  const [selectedId, setSelectedId] = useState([]);

  // État pour gérer le contenu du nouveau champ de saisie
  const [newCardContent, setNewCardContent] = useState('');

  // État pour gérer l'édition
  const [editingCardId, setEditingCardId] = useState(null);

  const handleCardClick = (id) => {
    // Empêcher la sélection pendant l'édition
    if (editingCardId) return;

    setSelectedId((prevSelected) => {
      // Si la carte est déjà sélectionnée, la désélectionner
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cardId) => cardId !== id);
      }

      // Si moins de deux cartes sont sélectionnées
      if (prevSelected.length < 2) {
        const newSelected = [...prevSelected, id];
        // Si deux cartes sont maintenant sélectionnées, programmer l'échange
        if (newSelected.length === 2) {
          // Programmer l'échange pour dans 800ms
          swapCards(newSelected[0], newSelected[1]);
        }
        return newSelected; // Ajouter la carte à la sélection
      }

      // Si deux cartes sont déjà sélectionnées, désélectionner les anciennes et sélectionner la nouvelle carte cliquée
      return [id];
    });
  };

  const swapCards = (id1, id2) => {  
    setCards((prevCards) => {      
      // Trouver les index des cartes à échanger
      const card1Index = prevCards.findIndex((card) => card.id === id1);
      const card2Index = prevCards.findIndex((card) => card.id === id2);

      // Vérifier si les cartes existent
      if (card1Index === -1 || card2Index === -1) {
        console.error("Erreur: Une ou les deux cartes sélectionnées n'ont pas été trouvées.");
        return prevCards;
      }

      // Créer une nouvelle copie du tableau
      const newCards = [...prevCards];
      // Échanger les positions des cartes dans le tableau
      [newCards[card1Index], newCards[card2Index]] = [newCards[card2Index], newCards[card1Index]];
      
      return newCards;
    });
    
    // Réinitialiser la sélection après l'échange
    setTimeout(() => {
      setSelectedId([]);
    }, 100);
  };

  // Fonction pour ajouter une nouvelle carte
  const handleAddCard = (e) => {
    if (e) e.preventDefault();
    
    // Vérifier que le champ n'est pas vide
    if (newCardContent.trim() === '') {
      alert('Veuillez saisir un contenu pour la carte');
      return;
    }

    // Générer un nouvel ID unique
    const newId = Math.max(...cards.map(card => card.id)) + 1;

    // Créer la nouvelle carte
    const newCard = {
      id: newId,
      content: newCardContent.trim()
    };

    // Ajouter la carte au tableau
    setCards(prevCards => [...prevCards, newCard]);

    // Réinitialiser le champ de saisie
    setNewCardContent('');
  };

  // UPDATE - Fonction pour modifier une carte
  const handleEditCard = (id) => {
    setEditingCardId(id);
    setSelectedId([]); // Désélectionner toutes les cartes pendant l'édition
  };

  const handleSaveEdit = (id, newContent) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, content: newContent } : card
      )
    );
    setEditingCardId(null);
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
  };

  // DELETE - Fonction pour supprimer une carte
  const handleDeleteCard = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      setCards(prevCards => prevCards.filter(card => card.id !== id));
      // Nettoyer les sélections si la carte supprimée était sélectionnée
      setSelectedId(prevSelected => prevSelected.filter(cardId => cardId !== id));
      // Arrêter l'édition si la carte en cours d'édition est supprimée
      if (editingCardId === id) {
        setEditingCardId(null);
      }
    }
  };

  const getStatusMessage = () => {
    if (editingCardId) {
      return "Mode édition activé. Modifiez le contenu et sauvegardez.";
    }
    if (selectedId.length === 1) {
      return "Cliquez sur une deuxième carte pour les échanger.";
    }
    if (selectedId.length === 0) {
      return "Sélectionnez deux cartes pour commencer l'échange.";
    }
    return "";
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Jeu de Cartes React</h1>
      
      {/* Formulaire d'ajout de carte */}
      <div className="add-card-form">
        <div className="form-group">
          <input
            type="text"
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            placeholder="Contenu de la nouvelle carte..."
            className="card-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCard(e);
              }
            }}
          />
          <button onClick={handleAddCard} className="add-button">
            Ajouter une carte
          </button>
        </div>
      </div>

      <p className="app-message">
        {getStatusMessage()}
      </p>
      
      {/* Composant CardList pour afficher les cartes */}
      <CardList 
        cards={cards} 
        selectedCardIds={selectedId} 
        onCardClick={handleCardClick}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
        editingCardId={editingCardId}
        onSave={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default App;