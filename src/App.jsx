import useGameLogic from "./hooks/useGameLogic.js";
import Scoreboard from "./components/Scoreboard.jsx";
import CardGrid from "./components/CardGrid.jsx";
import "./App.css";

function App() {
  const { cards, currentScore, bestScore, loading, error, handleCardClick } =
    useGameLogic();

  const renderContent = () => {
    if (loading) {
      return <div className="status-message">Loading Pokémon...</div>;
    }
    if (error) {
      return (
        <div className="status-message error">
          Error: {error}. Please try refreshing the page.
        </div>
      );
    }
    return <CardGrid cards={cards} onCardClick={handleCardClick} />;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pokémon Memory Game</h1>
        <p className="game-instructions">
          Get points by clicking on an image but don't click on any more than
          once!
        </p>

        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </header>
      <main>{renderContent()}</main>
    </div>
  );
}

export default App;
