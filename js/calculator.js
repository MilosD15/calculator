



function operate(operand1, operand2, operation) {
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