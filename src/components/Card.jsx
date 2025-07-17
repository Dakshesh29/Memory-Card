import React from "react";
import "./Card.css";

const Card = ({ cardData, onClick }) => {
  const placeholderImg = `https://placehold.co/96x96/f0f0f0/333?text=${cardData.name}`;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img
          src={cardData.image}
          alt={cardData.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImg;
          }}
        />
      </div>
      <p className="card-name">{cardData.name}</p>
    </div>
  );
};

export default Card;
