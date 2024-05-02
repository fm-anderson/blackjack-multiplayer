import { useEffect, useState } from "react";
import { drawCards, reshuffleDeck, shuffleNewDeck } from "./utils/api";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/helper";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [playerACards, setPlayerACards] = useState([]);
  const [playerBCards, setPlayerBCards] = useState([]);
  const [cardsRemaining, setCardsRemaining] = useState(0);

  useEffect(() => {
    const initializeDeck = async () => {
      let storedDeckId = getFromLocalStorage("deckId");

      if (storedDeckId) {
        const shuffledDeck = await reshuffleDeck(storedDeckId);
        if (shuffledDeck && shuffledDeck.success) {
          setDeckId(storedDeckId);
          setCardsRemaining(shuffledDeck.remaining);
        } else {
          const newDeck = await shuffleNewDeck();
          if (newDeck && newDeck.success) {
            setDeckId(newDeck.deck_id);
            setCardsRemaining(newDeck.remaining);
            saveToLocalStorage("deckId", newDeck.deck_id);
          }
        }
      } else {
        const newDeck = await shuffleNewDeck();
        if (newDeck && newDeck.success) {
          setDeckId(newDeck.deck_id);
          setCardsRemaining(newDeck.remaining);
          saveToLocalStorage("deckId", newDeck.deck_id);
        }
      }
    };

    initializeDeck();
  }, []);

  const handleDrawPlayerA = async () => {
    if (!deckId) return;
    const cardCount = playerACards.length === 0 ? 2 : 1; // Draws two cards initially, then one card subsequently
    const result = await drawCards(deckId, cardCount);
    if (result.success) {
      setPlayerACards(playerACards.concat(result.cards));
      setCardsRemaining(result.remaining); // Update the number of cards remaining in the deck
    }
  };

  const handleDrawPlayerB = async () => {
    if (!deckId) return;
    const cardCount = playerBCards.length === 0 ? 2 : 1; // Draws two cards initially, then one card subsequently
    const result = await drawCards(deckId, cardCount);
    if (result.success) {
      setPlayerBCards(playerBCards.concat(result.cards));
      setCardsRemaining(result.remaining); // Update the number of cards remaining in the deck
    }
  };

  return (
    <div className="p-4">
      <h1>Blackjack Multiplayer</h1>
      <p>Deck ID: {deckId}</p>
      <p>Cards Remaining: {cardsRemaining}</p>
      <div className="mt-10 flex flex-row gap-5">
        <div className="bg-green-200 p-6">
          <h3 className="text-lg font-semibold">Player 1</h3>
          <p>Cards:</p>
          <ul>
            {playerACards.map((card) => (
              <li key={card.code}>
                {card.value} of {card.suit}
              </li>
            ))}
          </ul>
          <button
            className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleDrawPlayerA}
          >
            Draw
          </button>
        </div>
        <div className="bg-yellow-200 p-6">
          <h3 className="text-lg font-semibold">Player 2</h3>
          <p>Cards:</p>
          <ul>
            {playerBCards.map((card) => (
              <li key={card.code}>
                {card.value} of {card.suit}
              </li>
            ))}
          </ul>
          <button
            className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleDrawPlayerB}
          >
            Draw
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
