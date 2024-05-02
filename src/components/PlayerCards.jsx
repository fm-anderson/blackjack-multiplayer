function PlayerCards({ title, cards, onDraw }) {
  return (
    <div className="bg-green-200 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>Cards:</p>
      <ul className="flex gap-1">
        {cards.map((card) => (
          <li key={card.code}>
            <img
              src={card.image}
              alt={`${card.value} of ${card.suit}`}
              className="w-24"
            />
          </li>
        ))}
      </ul>
      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={onDraw}
      >
        Draw
      </button>
    </div>
  );
}

export default PlayerCards;
