// User guide section
function Instructions() {
  return (
    <div className="bg-white rounded-xl shadow p-5 w-full max-w-sm md:max-w-md">
      <h2 className="text-xl font-bold mb-2">How to Use</h2>
      <ul className="list-disc ml-5 text-sm text-gray-700 mb-4">
        <li>Click the number buttons (0-9) to type a number.</li>
        <li>Click an operator (+, −, ×, ÷) to choose an operation.</li>
        <li>Type the second number, then click = to see the result.</li>
        <li>Click C to clear everything, or ⌫ to delete the last digit.</li>
        <li>You can also use your keyboard (numbers, + - * /, Enter, Backspace, Escape).</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">Supported Operations</h2>
      <ul className="list-disc ml-5 text-sm text-gray-700">
        <li>Addition (+)</li>
        <li>Subtraction (−)</li>
        <li>Multiplication (×)</li>
        <li>Division (÷) — dividing by zero shows an error</li>
      </ul>
    </div>
  );
}

export default Instructions;
