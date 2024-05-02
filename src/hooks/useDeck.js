import { useState, useEffect, useCallback } from "react";
import { shuffleNewDeck, reshuffleDeck } from "../utils/api";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/helper";

function useDeck() {
  const [deckId, setDeckId] = useState(null);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeDeck() {
      let storedDeckId = getFromLocalStorage("deckId");
      setIsLoading(true);

      if (storedDeckId) {
        const shuffledDeck = await reshuffleDeck(storedDeckId);
        if (shuffledDeck && shuffledDeck.success) {
          setDeckId(storedDeckId);
          setCardsRemaining(shuffledDeck.remaining);
        } else {
          const newDeck = await shuffleNewDeck();
          updateDeck(newDeck);
        }
      } else {
        const newDeck = await shuffleNewDeck();
        updateDeck(newDeck);
      }
      setIsLoading(false);
    }

    function updateDeck(deckData) {
      if (deckData && deckData.success) {
        setDeckId(deckData.deck_id);
        setCardsRemaining(deckData.remaining);
        saveToLocalStorage("deckId", deckData.deck_id);
      }
    }

    initializeDeck();
  }, []);

  const resetGame = useCallback(async () => {
    if (!deckId) return;
    const response = await reshuffleDeck(deckId);
    if (response.success) {
      setCardsRemaining(response.remaining);
    }
  }, [deckId]);

  return {
    deckId,
    cardsRemaining,
    setCardsRemaining,
    isLoading,
    resetGame,
  };
}

export default useDeck;
