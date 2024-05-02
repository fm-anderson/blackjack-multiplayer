import { useState } from "react";
import { drawCards, addToPile, listPileCards } from "./utils/api";
import useDeck from "./hooks/useDeck";
import PlayerCards from "./components/PlayerCards";

function App() {
  const { deckId, cardsRemaining, setCardsRemaining, isLoading, resetGame } =
    useDeck();
  const [playerACards, setPlayerACards] = useState([]);
  const [playerBCards, setPlayerBCards] = useState([]);

  const handleDrawPlayer = async (setPlayerCards, playerCards, pileName) => {
    if (!deckId || isLoading) return;
    const cardCount = playerCards.length === 0 ? 2 : 1;
    const result = await drawCards(deckId, cardCount);
    if (result.success) {
      setPlayerCards(playerCards.concat(result.cards));
      setCardsRemaining(result.remaining);

      const cardCodes = result.cards.map((card) => card.code).join(",");
      const addToPileResult = await addToPile(deckId, pileName, cardCodes);
      const listOfCardsOnPile = await listPileCards(deckId, pileName);

      if (!addToPileResult.success) {
        console.error("Failed to add cards to pile:", addToPileResult);
      }
    }
  };

  const handleResetGame = async () => {
    resetGame();
  };

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
            onDraw={() =>
              handleDrawPlayer(setPlayerACards, playerACards, "pileA")
            }
          />
          <PlayerCards
            title="Player 2"
            cards={playerBCards}
            onDraw={() =>
              handleDrawPlayer(setPlayerBCards, playerBCards, "pileB")
            }
          />
        </div>
      )}
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
