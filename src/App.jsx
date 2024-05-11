import useDeckOfCards from "usedeckofcards";
import PlayerCards from "./components/PlayerCards";
import { useState } from "react";

function App() {
  const [standA, setStandA] = useState(false);
  const [standB, setStandB] = useState(false);
  const {
    deckId,
    cardsRemaining,
    isLoading,
    resetGame,
    pileCards,
    drawAndAddToPile,
  } = useDeckOfCards();

  const handleResetGame = () => {
    setStandA(false);
    setStandB(false);
    resetGame();
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
        <PlayerCards
          title="Helraham"
          stand={standA}
          setStand={setStandA}
          pileCards={pileCards}
          drawAndAddToPile={drawAndAddToPile}
        />
        <PlayerCards
          title="Elstewart"
          stand={standB}
          setStand={setStandB}
          pileCards={pileCards}
          drawAndAddToPile={drawAndAddToPile}
        />
      </div>
      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleResetGame}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
