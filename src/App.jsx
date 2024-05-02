import { useState } from "react";
import { drawCards } from "./utils/api";
import useDeck from "./hooks/useDeck";
import PlayerCards from "./components/PlayerCards";

function App() {
  const { deckId, cardsRemaining, setCardsRemaining, isLoading } = useDeck();
  const [playerACards, setPlayerACards] = useState([]);
  const [playerBCards, setPlayerBCards] = useState([]);

  const handleDrawPlayer = async (setPlayerCards, playerCards) => {
    if (!deckId || isLoading) return;
    const cardCount = playerCards.length === 0 ? 2 : 1;
    const result = await drawCards(deckId, cardCount);
    if (result.success) {
      setPlayerCards(playerCards.concat(result.cards));
      setCardsRemaining(result.remaining);
    }
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
            onDraw={() => handleDrawPlayer(setPlayerACards, playerACards)}
          />
          <PlayerCards
            title="Player 2"
            cards={playerBCards}
            onDraw={() => handleDrawPlayer(setPlayerBCards, playerBCards)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
