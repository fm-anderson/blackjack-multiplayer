import { useMemo } from "react";
import CardBack from "./CardBack";
import { calculatePoints } from "../utils/helper";

function PlayerCards({ title, cards, onDraw }) {
  const points = useMemo(() => calculatePoints(cards), [cards]);
  const activeButton = "bg-blue-500 hover:bg-blue-700";
  const disabledButton = "bg-slate-500 opacity-60";

  return (
    <div className="bg-green-200 p-6">
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <p className="mb-4 rounded border-2 border-slate-500 bg-transparent px-4 py-2 font-bold">
        Points: {points}
      </p>
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
      <div className="mt-4 flex gap-2">
        <button
          className={`rounded px-4 py-2 font-bold text-white ${points >= 21 ? disabledButton : activeButton}`}
          onClick={onDraw}
          disabled={points >= 21}
        >
          Deal
        </button>
        <button
          className={`rounded px-4 py-2 font-bold text-white ${points >= 21 ? disabledButton : activeButton}`}
          // onClick={TODO}
        >
          Stand
        </button>
      </div>
    </div>
  );
}

export default PlayerCards;
