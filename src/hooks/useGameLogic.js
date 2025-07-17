import { useState, useEffect } from "react";
import { shuffleArray } from "../utils/arrayUtils.js";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";

const useGameLogic = () => {
  const [cards, setCards] = useState([]);
  const [clickedCardIds, setClickedCardIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(POKE_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon list");
        }
        const data = await response.json();

        const pokemonDetailsPromises = data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch details for ${pokemon.name}`);
          }
          const detailData = await detailResponse.json();
          return {
            id: detailData.id,
            name:
              detailData.name.charAt(0).toUpperCase() +
              detailData.name.slice(1),
            image: detailData.sprites.front_default,
          };
        });

        const detailedPokemon = await Promise.all(pokemonDetailsPromises);
        setCards(shuffleArray(detailedPokemon));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleCardClick = (cardId) => {
    if (clickedCardIds.includes(cardId)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCardIds([]);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedCardIds([...clickedCardIds, cardId]);
    }

    setCards(shuffleArray(cards));
  };

  return { cards, currentScore, bestScore, loading, error, handleCardClick };
};

export default useGameLogic;
