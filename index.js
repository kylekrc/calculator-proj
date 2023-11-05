let display = document.getElementById('display');
let memory = 0;
const valuesCalcu = [];
let hasPerformedCalculation = false;

function appendNumber(number) {
    display.innerText += number;
}

function appendOperator(operator) {
    if (display.innerText !== '') {
        valuesCalcu.push(parseFloat(display.innerText));
        valuesCalcu.push(operator);
        display.innerText = '';
    }
}

function appendDecimal() {
    // Ensure there's only one decimal point
    if (!display.innerText.includes('.')) {
        display.innerText += '.';
    }
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1);
}

function clearDisplay() {
    display.innerText = '';
}

function calculateResult() {
    if (display.innerText !== '') {
        valuesCalcu.push(parseFloat(display.innerText));
    }

    try {
        const result = eval(valuesCalcu.join(''));
        if (result.toString().length > 12) {
            display.innerText = result.toExponential(4);
        } else {
            display.innerText = result;
        }
        valuesCalcu.length = 0; // Clear the array
        hasPerformedCalculation = true;
    } catch {
        display.innerText = "Error";
    }
}

function binaryConversion() {
    try {
        const decimalInput = parseFloat(display.innerText);
        let binaryInput;

        if (!isNaN(decimalInput)) {
            const intValue = Math.floor(Math.abs(decimalInput));

            if (decimalInput < 0) {
                let binaryRepresentation = intValue.toString(2);

                const desiredBits = Math.max(binaryRepresentation.length, 6);
                binaryRepresentation = binaryRepresentation.padStart(desiredBits, '0');

                const onesComplement = binaryRepresentation.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
                binaryInput = addBinary(onesComplement, '1');
                binaryInput = binaryInput.slice(-binaryRepresentation.length);
            } else {
                binaryInput = intValue.toString(2);
            }

            if (binaryInput.length > 25) {
                display.innerText = 'Error';
            } else {
                display.innerText = binaryInput;
            }
        }
    } catch {
        display.innerText = 'Error';
    }
}

function addBinary(a, b) {
    let result = '';
    let carry = 0;
    const maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, '0');
    b = b.padStart(maxLength, '0');

    for (let i = maxLength - 1; i >= 0; i--) {
        const bitA = parseInt(a[i], 2);
        const bitB = parseInt(b[i], 2);
        const sum = bitA + bitB + carry;
        result = (sum % 2).toString() + result;
        carry = Math.floor(sum / 2);
    }

    if (carry > 0) {
        result = carry.toString() + result;
    }

    return result;
}

function memoryClear() {
    memory = 0;
}

function memoryPlus() {
    try {
        memory += parseFloat(display.innerText);
    } catch {
        display.innerText = "Error";
    }
}

function memoryMinus() {
    try {
        memory -= parseFloat(display.innerText);
    } catch {
        display.innerText = "Error";
    }
}

function memoryRecall() {
    display.innerText = memory.toString();
}

// Function to toggle the sign
function toggleSign() {
    if (display.innerText !== '') {
        let currentValue = parseFloat(display.innerText);
        display.innerText = (-currentValue).toString();
    }
}
//org