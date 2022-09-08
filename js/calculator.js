
// FUNCTIONS RELATED TO HANDLING CALCULATOR ACTIONS

export function handleEqual() {
    // continue here...
}

export function handleConcatenatingNumbers(mainResult, clickedNumber) {
    if (mainResult === 0) return Number(clickedNumber);

    let mainResultString = mainResult.toString();
    mainResultString += clickedNumber;

    return Number(mainResultString);
}

export function handleDeletingLastNumber(mainResult) {
    if (mainResult === 0) return mainResult;
    
    const mainResultString = mainResult.toString();
    if (mainResultString.length === 1 || mainResultString.match(/e/)) {
        return 0;
    }

    // try to improve calculator so that scientific number can also be 
    // handled in a nicer way than just resetting main result to 0

    const newMainResult = mainResultString.substring(0, mainResultString.length - 1);
    return Number(newMainResult);
}

export function operate(operand1, operand2, operation) {
    if (operation === '+') return add(operand1, operand2);
    if (operation === '-') return subtract(operand1, operand2);
    if (operation === '*') return multiply(operand1, operand2);
    if (operation === '/') return divide(operand1, operand2);
}

function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}