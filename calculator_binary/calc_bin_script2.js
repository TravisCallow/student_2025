const numBits = 24;
let binaryArray = new Array(numBits).fill(0);

function initializeBinaryButtons() {
    const binaryButtonsDiv = document.getElementById('binaryButtons');
    binaryButtonsDiv.innerHTML = ''; // Clear any existing buttons

    for (let i = 0; i < numBits; i++) {
        const button = document.createElement('button');
        button.classList.add('binary-button');
        button.textContent = binaryArray[i];
        button.dataset.index = i;
        button.onclick = () => toggleBit(i);

        // Apply different colors based on the index
        if (i < 8) {
            button.classList.add('red-button');   // First 8 bits for Red
        } else if (i < 16) {
            button.classList.add('green-button'); // Next 8 bits for Green
        } else {
            button.classList.add('blue-button');  // Last 8 bits for Blue
        }

        binaryButtonsDiv.appendChild(button);
    }
}

function toggleBit(index) {
    binaryArray[index] = binaryArray[index] === 0 ? 1 : 0;
    updateDisplay();
}

function updateDisplay() {
    const binaryButtons = document.getElementsByClassName('binary-button');
    for (let i = 0; i < binaryButtons.length; i++) {
        binaryButtons[i].textContent = binaryArray[i];
    }

    const binaryString = binaryArray.join('');
    const groupedBinaryString = binaryString.slice(0, 8) + ' | ' + binaryString.slice(8, 16) + ' | ' + binaryString.slice(16, 24);
    document.getElementById('binaryOutput').textContent = groupedBinaryString;

    const red = binarySliceToDecimal(0, 8);
    const green = binarySliceToDecimal(8, 16);
    const blue = binarySliceToDecimal(16, 24);

    const rgbString = `(${red}, ${green}, ${blue})`;
    document.getElementById('rgbOutput').textContent = rgbString;
    document.getElementById('colorDisplay').style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function binarySliceToDecimal(start, end) {
    return binaryArray.slice(start, end).reduce((acc, bit, index) => acc + bit * Math.pow(2, end - start - 1 - index), 0);
}

function incrementColor(color, increment) {
    let start, end;
    
    // Define the range of bits based on the color
    if (color === 'red') {
        start = 0;
        end = 8;
    } else if (color === 'green') {
        start = 8;
        end = 16;
    } else if (color === 'blue') {
        start = 16;
        end = 24;
    }

    // Get the current color value in decimal
    let colorValue = binarySliceToDecimal(start, end);
    
    // Increment or decrement the color value
    colorValue = Math.max(0, Math.min(255, colorValue + increment)); // Keep between 0 and 255

    // Update the binary array with the new color value
    let newBinary = decimalToBinaryArray(colorValue, 8);
    for (let i = 0; i < 8; i++) {
        binaryArray[start + i] = newBinary[i];
    }

    // Update the display after changing the binary array
    updateDisplay();
}

function decimalToBinaryArray(decimal, length) {
    return decimal.toString(2).padStart(length, '0').split('').map(Number);
}

initializeBinaryButtons();
updateDisplay();
