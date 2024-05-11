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
