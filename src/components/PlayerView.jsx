import { useMemo, useState, useEffect, useCallback } from "react";
import { calculatePoints } from "../utils/helper";
import ActionButton from "./ActionButton";
import CardBack from "./CardBack";
import PropTypes from "prop-types";

function PlayerView({ title, pileCards, onDraw, onStand }) {
  const [stand, setStand] = useState(false);

  const cards = useMemo(() => {
    return pileCards.filter(
      (card) => card.pileName === title || card.pileName === `stand_${title}`,
    );
  }, [pileCards, title]);

  const isStand = useMemo(() => {
    return cards.length > 0 && cards[0].pileName.includes("stand");
  }, [cards]);

  const points = useMemo(() => {
    return calculatePoints(cards);
  }, [cards]);

  const handleStand = useCallback(() => {
    const codes = cards.map((card) => card.code).join(",");
    onStand(title, `stand_${title}`, codes);
  }, [cards, onStand, title]);

  const handleDeal = useCallback(() => {
    if (cards.length === 0) {
      onDraw(title, 2);
    } else {
      onDraw(title, 1);
    }
  }, [cards.length, onDraw, title]);

  useEffect(() => {
    setStand(isStand);
  }, [isStand]);

  useEffect(() => {
    if (points > 21 && !isStand && !stand) {
      handleStand();
      setStand(true);
    }
  }, [points, isStand, handleStand, stand]);

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

PlayerView.propTypes = {
  title: PropTypes.string.isRequired,
  pileCards: PropTypes.array.isRequired,
  onDraw: PropTypes.func.isRequired,
  onStand: PropTypes.func.isRequired,
};

export default PlayerView;
