import React from "react";
import Card from "./Card.jsx";
import "./CardGrid.css";

const CardGrid = ({ cards, onCardClick }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          cardData={card}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
