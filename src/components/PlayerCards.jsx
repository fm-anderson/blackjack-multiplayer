import { useMemo } from "react";
import CardBack from "./CardBack";

function PlayerCards({ title, cards, onDraw }) {
  const calculatePoints = (cards) => {
    return cards.reduce((total, card) => {
      if (["KING", "QUEEN", "JOKER"].includes(card.value)) {
        return total + 10;
      }
      return total + parseInt(card.value, 10) || 0;
    }, 0);
  };

  const points = useMemo(() => calculatePoints(cards), [cards]);

  return (
    <div className="bg-green-200 p-6">
      <h3 className="mb-4 text-center text-lg font-semibold">{title}</h3>
      <ul className="flex gap-1">
        {cards.length === 0 ? (
          <>
            <CardBack />
            <CardBack />
          </>
        ) : (
          cards.map((card) => (
            <li key={card.code}>
              <img
                src={card.image}
                alt={`${card.value} of ${card.suit}`}
                className="w-24"
              />
            </li>
          ))
        )}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={onDraw}
        >
          Draw
        </button>
        <p className="rounded bg-slate-500 px-4 py-2 font-bold text-white">
          Points: {points}
        </p>
      </div>
    </div>
  );
}

export default PlayerCards;
