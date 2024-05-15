import useDeckOfCards from "usedeckofcards";
import PlayerView from "./components/PlayerView";
import { resetPrizePot } from "./utils/helper";

function App() {
  const {
    deckId,
    isLoading,
    pileCards,
    cardsRemaining,
    resetGame,
    drawAndAddToPile,
    moveCardsBetweenPiles,
  } = useDeckOfCards();

  const handleNewGame = () => {
    resetGame();
    resetPrizePot();
  };

  return (
    <div className="p-4">
      <h1>Blackjack Multiplayer</h1>
      <p>Deck ID: {deckId}</p>
      <span className="flex gap-5">
        <p>Cards Remaining: {cardsRemaining}</p>
        {isLoading && <p>Loading...</p>}
      </span>

      <div className="mt-10 flex flex-row gap-5">
        <PlayerView
          title="Helraham"
          pileCards={pileCards}
          onDraw={drawAndAddToPile}
          onStand={moveCardsBetweenPiles}
        />
        <PlayerView
          title="Elstewart"
          pileCards={pileCards}
          onDraw={drawAndAddToPile}
          onStand={moveCardsBetweenPiles}
        />
      </div>
      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleNewGame}
      >
        Play Again
      </button>
    </div>
  );
}

export default App;
