import { useState, useEffect } from "react";
import Display from "./components/Display.jsx";
import Button from "./components/Button.jsx";
import Instructions from "./components/Instructions.jsx";

function App() {
  // React state
  const [display, setDisplay] = useState("0"); // what is shown on screen
  const [firstNumber, setFirstNumber] = useState(null); // saved first number
  const [operator, setOperator] = useState(null); // + - * /
  const [newNumber, setNewNumber] = useState(true); // true = next digit starts a new number

  // Do the math for two numbers
  function calculate(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") {
      if (b === 0) return "Error"; // error handling: divide by zero
      return a / b;
    }
    return b;
  }

  // Make long decimals look nice
  function format(result) {
    if (result === "Error") return "Error";
    return String(Math.round(result * 100000000) / 100000000);
  }

  // Number button clicked
  function handleNumber(num) {
    if (display === "Error" || newNumber || display === "0") {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  }

  // Decimal point clicked
  function handleDecimal() {
    if (newNumber || display === "Error") {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  // Operator button clicked
  function handleOperator(op) {
    if (display === "Error") return;
    const current = Number(display);

    if (operator !== null && !newNumber) {
      // there is already a pending operation, so finish it first
      const result = calculate(firstNumber, current, operator);
      setDisplay(format(result));
      setFirstNumber(result === "Error" ? null : result);
      if (result === "Error") {
        setOperator(null);
        setNewNumber(true);
        return;
      }
    } else {
      setFirstNumber(current);
    }
    setOperator(op);
    setNewNumber(true);
  }

  // Equals button clicked
  function handleEquals() {
    if (operator === null || newNumber) return;
    const result = calculate(firstNumber, Number(display), operator);
    setDisplay(format(result));
    setFirstNumber(null);
    setOperator(null);
    setNewNumber(true);
  }

  // Clear button clicked
  function handleClear() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setNewNumber(true);
  }

  // Backspace button clicked
  function handleBackspace() {
    if (newNumber || display === "Error") return;
    if (display.length === 1) {
      setDisplay("0");
      setNewNumber(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  }

  // Keyboard support
  useEffect(() => {
    function handleKey(e) {
      if (e.key >= "0" && e.key <= "9") handleNumber(e.key);
      else if (e.key === ".") handleDecimal();
      else if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
      else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key === "Escape") handleClear();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 p-4">
      <h1 className="text-3xl font-bold mt-4">React Calculator</h1>

      {/* Calculator */}
      <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-sm md:max-w-md">
        <Display value={display} />

        <div className="grid grid-cols-4 gap-3">
          <Button label="C" color="red" onClick={handleClear} />
          <Button label="⌫" onClick={handleBackspace} />
          <Button label="÷" color="orange" onClick={() => handleOperator("/")} />
          <Button label="×" color="orange" onClick={() => handleOperator("*")} />

          <Button label="7" onClick={() => handleNumber("7")} />
          <Button label="8" onClick={() => handleNumber("8")} />
          <Button label="9" onClick={() => handleNumber("9")} />
          <Button label="−" color="orange" onClick={() => handleOperator("-")} />

          <Button label="4" onClick={() => handleNumber("4")} />
          <Button label="5" onClick={() => handleNumber("5")} />
          <Button label="6" onClick={() => handleNumber("6")} />
          <Button label="+" color="orange" onClick={() => handleOperator("+")} />

          <Button label="1" onClick={() => handleNumber("1")} />
          <Button label="2" onClick={() => handleNumber("2")} />
          <Button label="3" onClick={() => handleNumber("3")} />
          <Button label="=" color="orange" onClick={handleEquals} />

          <Button label="0" wide onClick={() => handleNumber("0")} />
          <Button label="." onClick={handleDecimal} />
        </div>
      </div>

      <Instructions />
    </div>
  );
}

export default App;
