import { useMemo, useState, useEffect } from "react";
import { calculatePoints } from "../utils/helper";
import ActionButton from "./ActionButton";
import CardBack from "./CardBack";

function PlayerView({ title, pileCards, onDraw, onStand }) {
  const [stand, setStand] = useState(false);
  const cards = pileCards.filter(
    (card) => card.pileName === title || card.pileName === `stand_${title}`,
  );

  const points = useMemo(() => calculatePoints(cards), [cards]);
  const isStand = useMemo(() => cards[0]?.pileName?.includes("stand"), [cards]);

  useEffect(() => {
    setStand(isStand);
  }, [isStand]);

  useEffect(() => {
    if (points > 21 && !isStand) {
      handleStand();
    }
  }, [points, isStand]);

  const handleDeal = () => {
    if (cards.length === 0) {
      onDraw(title, 2);
    } else {
      onDraw(title, 1);
    }
  };

  const handleStand = () => {
    const codes = cards.map((card) => card.code).join(",");
    onStand(title, `stand_${title}`, codes);
  };

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
        <ActionButton
          title="Deal"
          action={handleDeal}
          points={points}
          stand={stand}
        />
        <ActionButton
          title="Stand"
          action={handleStand}
          points={points}
          stand={stand}
        />
      </div>
    </div>
  );
}

export default PlayerView;
