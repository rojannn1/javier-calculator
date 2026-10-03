// One calculator button. "color" changes the look, "onClick" is the event handler.
function Button({ label, onClick, color = "gray", wide = false }) {
  const colors = {
    gray: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} ${wide ? "col-span-2" : ""} text-xl font-semibold rounded-lg py-4 active:scale-95 transition`}
    >
      {label}
    </button>
  );
}

export default Button;
