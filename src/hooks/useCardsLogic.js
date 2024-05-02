import { useState, useEffect, useCallback } from "react";
import {
  shuffleNewDeck,
  reshuffleDeck,
  drawCards,
  addToPile,
  listPileCards,
} from "../utils/api";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/helper";

function useCardsLogic() {
  const [deckId, setDeckId] = useState(null);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playerACards, setPlayerACards] = useState([]);
  const [playerBCards, setPlayerBCards] = useState([]);

  const updateDeck = useCallback((deckData) => {
    if (deckData && deckData.success) {
      setDeckId(deckData.deck_id);
      setCardsRemaining(deckData.remaining);
      saveToLocalStorage("deckId", deckData.deck_id);
    }
  }, []);

  const initializeDeck = useCallback(async () => {
    const storedDeckId = getFromLocalStorage("deckId");
    setIsLoading(true);
    if (storedDeckId) {
      try {
        const shuffledDeck = await reshuffleDeck(storedDeckId);
        if (shuffledDeck && shuffledDeck.success) {
          setDeckId(storedDeckId);
          setCardsRemaining(shuffledDeck.remaining);
        } else {
          const newDeck = await shuffleNewDeck();
          updateDeck(newDeck);
        }
      } catch (error) {
        console.error("Failed to reshuffle deck:", error);
        const newDeck = await shuffleNewDeck();
        updateDeck(newDeck);
      }
    } else {
      const newDeck = await shuffleNewDeck();
      updateDeck(newDeck);
    }
    setIsLoading(false);
  }, [updateDeck]);

  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const handleDrawPlayer = async (setPlayerCards, pileName) => {
    if (!deckId || isLoading) return;
    const playerCardsLength = await getPlayerCardsLengthFromPile(pileName);
    const cardCount = playerCardsLength === 0 ? 2 : 1;
    const result = await drawCards(deckId, cardCount);
    if (result.success) {
      setCardsRemaining(result.remaining);
      const cardCodes = result.cards.map((card) => card.code).join(",");
      const addToPileResult = await addToPile(deckId, pileName, cardCodes);
      if (addToPileResult.success) {
        const listOfCardsOnPile = await listPileCards(deckId, pileName);
        if (listOfCardsOnPile.success) {
          setPlayerCards(listOfCardsOnPile.piles[pileName].cards);
        }
      }
    }
  };

  const getPlayerCardsLengthFromPile = async (pileName) => {
    const pileData = await listPileCards(deckId, pileName);
    if (pileData.success && pileData.piles[pileName]) {
      return pileData.piles[pileName].cards.length;
    }
    return 0;
  };

  const resetGame = useCallback(async () => {
    if (!deckId) return;
    const response = await reshuffleDeck(deckId);
    if (response.success) {
      setCardsRemaining(response.remaining);
      setPlayerACards([]);
      setPlayerBCards([]);
    }
  }, [deckId, setCardsRemaining, setPlayerACards, setPlayerBCards]);

  return {
    deckId,
    cardsRemaining,
    isLoading,
    playerACards,
    playerBCards,
    handleDrawPlayer,
    resetGame,
    setPlayerACards,
    setPlayerBCards,
  };
}

export default useCardsLogic;
