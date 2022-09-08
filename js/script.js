
// imports
import { updateHTML } from "./DOManip.js";
import { handleDeletingLastNumber, handleConcatenatingNumbers } from "./calculator.js";

// DOM elements
const firstOperandElement = document.querySelector("[data-first-operand]");
const operationElement = document.querySelector("[data-chosen-operation]");
const mainResultElement = document.querySelector("[data-main-result]");
const functionsContainer = document.querySelector("[data-functions]");

// global variables
let mainResult = 0;
let firstOperand = 0;
let currentOperation = '';

// helper function
function printGlobalVariables() {
    console.log(mainResult);
    console.log(firstOperand);
    console.log(currentOperation);
}

// setting default values and clearing calculator data
window.onload = () => clearAll(true);

// handling clicking on calculator buttons
functionsContainer.addEventListener('click', e => {
    const {role, value} = determineRole(e.target);
    if (role === 'special-button') {
        handleSpecialButtons(value);
    } else if (role === 'number') {
        mainResult = handleConcatenatingNumbers(mainResult, value);
        updateHTML(mainResultElement, mainResult);
    } else if (role === 'operation') {
        handleOperation(value);
    }
    printGlobalVariables();
});

// determining button role and its function
function determineRole(button) {
    if (button.dataset.ac) return { role: 'special-button', value: 'AC' }
    if (button.dataset.del) return { role: 'special-button', value: 'DEL' }
    if (button.dataset.point) return { role: 'special-button', value: 'point' }
    if (button.dataset.equal) return { role: 'special-button', value: 'equal' }
    if (button.dataset.number) return { role: 'number', value: button.dataset.number }
    if (button.dataset.operation) return { role: 'operation', value: button.dataset.operation }
}

// handling special button (AC, DEL, ., =)
function handleSpecialButtons(label) {
    if (label === 'AC') {
        clearAll();
    } else if (label === 'DEL') {
        mainResult = handleDeletingLastNumber(mainResult);
        updateHTML(mainResultElement, mainResult);
    } else if (label === 'point') {

    } else if (label === 'equal') {
        mainResult = handleEqual(mainResult, firstOperand, operation);
    }
}

function handleOperation(newOperation) {
    currentOperation = newOperation;
    updateHTML(operationElement, currentOperation);

    firstOperand = mainResult;
    updateHTML(firstOperandElement, firstOperand);

    mainResult = 0;
    updateHTML(mainResultElement, mainResult);
}

export function clearAll(force = false) {
    if (mainResult === 0 && firstOperand === 0 && currentOperation === '' && force !== true) return;
    
    mainResult = 0;
    firstOperand = 0;
    currentOperation = '';

    updateHTML(mainResultElement, 0);
    updateHTML(firstOperandElement, '');
    updateHTML(operationElement, '');
}