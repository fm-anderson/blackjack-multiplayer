function BetButton({ amount, wallet, stand, action, cards }) {
  return (
    <button
      className={`rounded px-4 py-2 font-bold text-white ${amount > wallet || stand || cards.length > 0 ? "bg-emerald-500 opacity-70" : "bg-emerald-500 hover:bg-emerald-700"}`}
      onClick={() => action(wallet - amount)}
      disabled={amount > wallet || cards.length > 0 || stand}
    >
      ${amount}
    </button>
  );
}

export default BetButton;
