console.log("connected");

const buttons = document.querySelectorAll(".buttons ul li input");
const displayElement = document.querySelector(".display p");

var result = "";
var operation = "";
var previousOperand = "";

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    currentValue = e.target.value;
    if (currentValue === "AC") {
      cleardisplay();
    } else if (currentValue === "DEL") {
      deleteDigits();
    } else if (
      currentValue === "+" ||
      currentValue === "-" ||
      currentValue === "*" ||
      currentValue === "/" ||
      currentValue === "^"
    ) {
      selectOperator(currentValue);
    } else if (currentValue === "=") {
      if (operation === "" || result === "") return;
      result = calulator(previousOperand, result, operation);
      updateDisplay();
    } else {
      appendNumber(currentValue);
    }
  });
});

// Append Numbers and display 
const appendNumber = (number) => {
  if (number === "." && result.includes(".")) return;
  result += number;
  updateDisplay();
};

//Select operator to calculate
const selectOperator = (operator) => {
  if (result === "") return;
  if (operation !== "" && result !== "") {
    result = calulator(previousOperand, result, operation);
  }
  operation = operator;
  displayElement.innerHTML += operator;
  previousOperand = result;
  result = "";
  updateDisplay();
};

//Update display
const updateDisplay = () => {
  if (operation) {
    displayElement.innerHTML = `${previousOperand} ${operation} ${result}`;
  } else {
    displayElement.innerHTML = result;
  }
};

// Clear display
const cleardisplay = () => {
  displayElement.innerHTML = "";
  result = "";
  operation = "";
  previousOperand = "";
};

// Delete last digit from display element
const deleteDigits = () => {
  if (operation !== "" && result === "") {
    operation = "";
    result = previousOperand;
    previousOperand = "";
    updateDisplay();
  } else {
    result = result.slice(0, -1);
    updateDisplay();
  }
};

// Calculate values and return result
const calulator = (prevOperand, currentOparand, operator) => {
  let evalutedResult;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOparand);

  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      evalutedResult = prev + current;
      break;

    case "-":
      evalutedResult = prev - current;
      break;

    case "/":
      evalutedResult = prev / current;
      break;

    case "*":
      evalutedResult = prev * current;
      break;
    case "^":
      evalutedResult = prev ** current;
      break;

    default:
      return;
  }

  previousOperand = "";
  operation = "";
  evalutedResult = evalutedResult.toFixed(2);
  // console.log(typeof result);
  return parseFloat(evalutedResult).toString();
};

// Using eval method
// buttons.forEach((input) => {
//   input.addEventListener("click", (e) => {
//     if (e.target.value === "AC") {
//       inputValue = "0";
//       displayElement.innerHTML = inputValue;
//     } else if (e.target.value === "=") {
//       inputValue = eval(inputValue);
//       displayElement.innerHTML = inputValue;
//     } else {
//       if (e.target.value === "." && inputValue.includes(".")) return;
//       inputValue = inputValue + e.target.value;
//       displayElement.innerHTML = inputValue;
//     }
//   });
// });
