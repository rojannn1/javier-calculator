// Shows the current number or result
function Display({ value }) {
  return (
    <div className="bg-gray-900 text-white text-right text-4xl font-mono rounded-lg p-4 mb-4 overflow-x-auto">
      {value}
    </div>
  );
}

export default Display;
