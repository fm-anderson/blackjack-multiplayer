function ActionButton({ title, action, points, stand }) {
  return (
    <button
      className={`rounded px-4 py-2 font-bold text-white ${points >= 21 || stand ? "bg-slate-500 opacity-60" : "bg-blue-500 hover:bg-blue-700"}`}
      onClick={action}
      disabled={points >= 21 || stand}
    >
      {title}
    </button>
  );
}

export default ActionButton;
