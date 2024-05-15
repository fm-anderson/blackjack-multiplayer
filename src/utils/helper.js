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

export function addToPrizePot(value) {
  try {
    const existingValue = localStorage.getItem("prizepot");
    if (existingValue !== null) {
      const parsedValue = JSON.parse(existingValue);
      const updatedValue = parsedValue + value;
      localStorage.setItem("prizepot", JSON.stringify(updatedValue));
    } else {
      localStorage.setItem("prizepot", JSON.stringify(value));
    }
  } catch (error) {
    console.error("Error updating localStorage:", error);
  }
}

export function resetPrizePot() {
  try {
    localStorage.setItem("prizepot", JSON.stringify(0));
  } catch (error) {
    console.error("Error resetting prize pot in localStorage:", error);
  }
}
