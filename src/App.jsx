import { useState } from "react";
import useDeckOfCards from "./hooks/useDeckOfCards";
import PlayerCards from "./components/PlayerCards";

function App() {
  const {
    deckId,
    cardsRemaining,
    isLoading,
    playerACards,
    playerBCards,
    handleDrawPlayer,
    resetGame,
    setPlayerACards,
    setPlayerBCards,
  } = useDeckOfCards();

  return (
    <div className="p-4">
      <h1>Blackjack Multiplayer</h1>
      <p>Deck ID: {deckId}</p>
      <p>Cards Remaining: {cardsRemaining}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-10 flex flex-row gap-5">
          <PlayerCards
            title="Player 1"
            cards={playerACards}
            onDraw={() => handleDrawPlayer(setPlayerACards, "pileA")}
          />
          <PlayerCards
            title="Player 2"
            cards={playerBCards}
            onDraw={() => handleDrawPlayer(setPlayerBCards, "pileB")}
          />
        </div>
      )}
      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
