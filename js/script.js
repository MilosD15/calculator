
// imports
import { updateHTML, showErrorMessage, disablePointBtn, enablePointBtn } from "./DOManip.js";
import { 
    handleDeletingLastNumber, 
    handleConcatenatingNumbers, 
    calculate,
    handleDecimalPointNumber
} from "./calculator.js";

// DOM elements
const firstOperandElement = document.querySelector("[data-first-operand]");
const operationElement = document.querySelector("[data-chosen-operation]");
const mainResultElement = document.querySelector("[data-main-result]");
const functionsContainer = document.querySelector("[data-functions]");

// global variables
let mainResult = '0';
let firstOperand = 0;
let currentOperation = '';

// helper function
function printGlobalVariables() {
    console.log(mainResult);
    console.log(firstOperand);
    console.log(currentOperation);
}

// setting default values and clearing calculator data
window.onload = () => clearAll();

// handling clicking on calculator buttons
functionsContainer.addEventListener('click', e => {
    // returns immediately if the user accidentally clicked somewhere between buttons
    if (e.target.tagName !== 'BUTTON') return;

    const {role, value} = determineRole(e.target);
    if (role === 'special-button') {
        handleSpecialButtons(value);
    } else if (role === 'number') {
        mainResult = handleConcatenatingNumbers(mainResult, value);
        updateHTML(mainResultElement, mainResult);
    } else if (role === 'operation') {
        handleOperation(value);
    }

    // if the mainResult doesn't contain dot, let user the option to add it
    if (mainResult.indexOf('.') === -1) enablePointBtn();
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
        handlePoint();
    } else if (label === 'equal') {
        handleEqual(mainResult, firstOperand, currentOperation);
    }
}

function handleOperation(newOperation) {
    const newCalculations = calculate(mainResult, firstOperand, currentOperation);
    if (newCalculations.validExpression === false) {
        showErrorMessage();
        clearAll(); return;
    }

    mainResult = '0';
    firstOperand = handleDecimalPointNumber(Number(newCalculations.mainResult));
    currentOperation = newOperation;
    
    updateHTML(mainResultElement, mainResult);
    updateHTML(firstOperandElement, firstOperand);
    updateHTML(operationElement, currentOperation);
}

function handleEqual() {
    const newCalculations = calculate(mainResult, firstOperand, currentOperation);
    if (newCalculations.validExpression === false) {
        showErrorMessage();
        clearAll(); return;
    }

    mainResult = newCalculations.mainResult;
    firstOperand = newCalculations.firstOperand;
    currentOperation = '';

    updateHTML(mainResultElement, mainResult);
    updateHTML(firstOperandElement, '');
    updateHTML(operationElement, '');
}

function handlePoint() {
    // don't change anything if dot is already active
    if (mainResultElement.textContent.includes('.')) return;

    mainResult += '.';
    updateHTML(mainResultElement, mainResult);
    disablePointBtn();
}

function clearAll() {
    if (mainResult !== 0 || firstOperand !== 0 || currentOperation !== '') {
        mainResult = '0';
        firstOperand = 0;
        currentOperation = '';
    }

    updateHTML(mainResultElement, 0);
    updateHTML(firstOperandElement, '');
    updateHTML(operationElement, '');
}