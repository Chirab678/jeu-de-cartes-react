import React, { useState } from 'react';
import { CardList } from './CardList.jsx';
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

  const handleCardClick = (id) => {
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
    e.preventDefault();
    
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

  return (
    <div className="app-container">
      <h1 className="app-title">Jeu de Cartes React</h1>
      
      {/* Formulaire d'ajout de carte */}
      <form className="add-card-form" onSubmit={handleAddCard}>
        <div className="form-group">
          <input
            type="text"
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            placeholder="Contenu de la nouvelle carte..."
            className="card-input"
          />
          <button type="submit" className="add-button">
            Ajouter une carte
          </button>
        </div>
      </form>

      <p className="app-message">
        {/* Afficher un message en fonction du nombre de cartes sélectionnées */}
        {selectedId.length === 1 && "Cliquez sur une deuxième carte pour les échanger."}
        {selectedId.length === 0 && "Sélectionnez deux cartes pour commencer l'échange."}
      </p>
      
      {/* Composant CardList pour afficher les cartes */}
      <CardList cards={cards} selectedCardIds={selectedId} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;