import { saveToLocalStorage } from "./helper";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const shuffleNewDeck = async (deckCount = 1) => {
  const response = await fetch(
    `${baseUrl}/new/shuffle/?deck_count=${deckCount}`,
  );
  const data = await response.json();
  saveToLocalStorage("deckId", data.deck_id);
  return data;
};

export const drawCards = async (deckId, count = 1) => {
  const response = await fetch(`${baseUrl}/${deckId}/draw/?count=${count}`);
  const data = await response.json();
  return data;
};

export const reshuffleDeck = async (deckId, remaining = false) => {
  const response = await fetch(
    `${baseUrl}/${deckId}/shuffle/${remaining ? "?remaining=true" : ""}`,
  );
  const data = await response.json();
  return data;
};

export const addToPile = async (deckId, pileName, cards) => {
  const response = await fetch(
    `${baseUrl}/${deckId}/pile/${pileName}/add/?cards=${cards}`,
  );
  const data = await response.json();
  return data;
};

export const listPileCards = async (deckId, pileName) => {
  const response = await fetch(`${baseUrl}/${deckId}/pile/${pileName}/list/`);
  const data = await response.json();
  return data;
};
