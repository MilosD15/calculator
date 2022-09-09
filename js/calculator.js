
// FUNCTIONS RELATED TO HANDLING CALCULATOR ACTIONS

export function calculate(mainResult, firstOperand, currentOperation) {
    if (currentOperation === '÷' && mainResult === '0') 
        return { validExpression: false, mainResult: '0', firstOperand: 0 }

    if (currentOperation === '') 
        return { validExpression: true, mainResult, firstOperand }

    mainResult = operate(firstOperand, Number(mainResult), currentOperation);
    return { validExpression: true, mainResult: String(mainResult), firstOperand: 0 }
}

export function handleConcatenatingNumbers(mainResult, clickedNumber) {
    if (mainResult === '0') return clickedNumber;

    mainResult += clickedNumber;
    return mainResult;
}

export function handleDeletingLastNumber(mainResult) {
    if (mainResult === '0') return '0';
    
    if (mainResult.length === 1 || mainResult.match(/e/)) return '0';

    // try to improve calculator so that scientific number can also be 
    // handled in a nicer way than just resetting main result to 0

    const newMainResult = mainResult.substring(0, mainResult.length - 1);
    // erase the dot if it's the last character in mainResult string
    if (newMainResult[newMainResult.length - 1] === '.') {
        return newMainResult.substring(0, newMainResult.indexOf('.'));
    }

    return newMainResult;
}

export function handleDecimalPointNumber(number) {
    if (number.toString().indexOf('.') === -1) return number;

    const digitsAfterDot = number.toString().split('.')[1];
    if (digitsAfterDot.length <= 5) return number;

    return Number(number.toFixed(5));
}

function operate(operand1, operand2, operation) {
    if (operation === '+') return add(operand1, operand2);
    if (operation === '-') return subtract(operand1, operand2);
    if (operation === '*') return multiply(operand1, operand2);
    if (operation === '÷') return divide(operand1, operand2);
}

function add(operand1, operand2) {
    return handleDecimalPointNumber(operand1 + operand2);
}

function subtract(operand1, operand2) {
    return handleDecimalPointNumber(operand1 - operand2);
}

function multiply(operand1, operand2) {
    return handleDecimalPointNumber(operand1 * operand2);
}

function divide(operand1, operand2) {
    return handleDecimalPointNumber(operand1 / operand2);
}