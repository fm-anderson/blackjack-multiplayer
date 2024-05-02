export function saveToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);

    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error storing data in localStorage:", error);
  }
}

export function getFromLocalStorage(key) {
  try {
    const serializedData = localStorage.getItem(key);

    if (serializedData === null) {
      console.error("No data found for key:", key);
      return null;
    }

    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return null;
  }
}

export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from localStorage:", error);
  }
}

export const calculatePoints = (cards) => {
  let total = 0;
  let aces = 0;

  cards.forEach((card) => {
    switch (card.value) {
      case "KING":
      case "QUEEN":
      case "JACK":
        total += 10;
        break;
      case "ACE":
        aces += 1;
        break;
      default:
        total += parseInt(card.value, 10) || 0;
        break;
    }
  });

  for (let i = 0; i < aces; i++) {
    if (total + 11 > 21) {
      total += 1;
    } else {
      total += 11;
    }
  }

  return total;
};
