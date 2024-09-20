// Array to store calculation history
let history = [];

// Function to append a value to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to delete the last character from the display
function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Function to append square root and manage parentheses
function appendSquareRoot() {
    const display = document.getElementById('display');
    let currentValue = display.value;

    // Ensure any existing unclosed Math.sqrt( is closed properly
    if (currentValue.endsWith('sqrt(')) {
        display.value += ')';
        return;
    }

    // Use a regular expression to capture the last number or expression
    const lastNumberMatch = currentValue.match(/(\d+\.?\d*)$/);

    if (lastNumberMatch) {
        // If there's a number, wrap it in Math.sqrt()
        const lastNumber = lastNumberMatch[0];
        display.value = currentValue.replace(lastNumber, `Math.sqrt(${lastNumber})`);
    } else {
        // If no number, just append Math.sqrt(
        display.value += 'Math.sqrt(';
    }
}

// Function to calculate the result
function calculate() {
    const display = document.getElementById('display');
    let expression = display.value;

    // Replace ^ with Math.pow() or ** for exponentiation
    expression = expression.replace(/(\d+\.?\d*)\^(\d+\.?\d*)/g, (match, base, exponent) => `Math.pow(${base}, ${exponent})`);
    // Alternatively, use the ** operator:
    // expression = expression.replace(/(\d+\.?\d*)\^(\d+\.?\d*)/g, (match, base, exponent) => `${base} ** ${exponent}`);

    try {
        // Evaluate the expression
        const result = eval(expression);
        display.value = result;

        // Save the calculation to history
        history.push({ expression, result });
        updateHistory();
    } catch (error) {
        display.value = 'Error';
    }
}

// Function to update the history display
function updateHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';

    history.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `${entry.expression} = ${entry.result}`;
        historyContainer.appendChild(entryElement);
    });
}

// Function to clear the history
function clearHistory() {
    history = [];
    updateHistory();
}
