
// imports
import { disablePointBtn, enablePointBtn } from "./DOManip.js";
import { clearAll, handlePoint, handleEqual, handleOperation, handleNumber, handleDEL } from "./utils.js";

// DOM elements
const functionsContainer = document.querySelector("[data-functions]");
const keyboardKeysContainer = document.querySelector('[data-keyboard-keys]');
const mainKeyElement = document.querySelector('[data-main-key]');

// constants
const KEYBOARD_KEY_FUNCTION_PAIRS = [
    { role: 'special-button', function: 'AC', keyboardKey: 'c', btnSelector: '[data-AC]' },
    { role: 'special-button', function: 'DEL', keyboardKey: 'backspace', btnSelector: '[data-DEL]' },
    { role: 'special-button', function: 'point', keyboardKey: '.', btnSelector: '[data-point]' },
    { role: 'special-button', function: 'equal', keyboardKey: 'enter', btnSelector: '[data-equal]' },
    { role: 'number', function: '1', keyboardKey: '1', btnSelector: '[data-number="1"]' },
    { role: 'number', function: '2', keyboardKey: '2', btnSelector: '[data-number="2"]' },
    { role: 'number', function: '3', keyboardKey: '3', btnSelector: '[data-number="3"]' },
    { role: 'number', function: '4', keyboardKey: '4', btnSelector: '[data-number="4"]' },
    { role: 'number', function: '5', keyboardKey: '5', btnSelector: '[data-number="5"]' },
    { role: 'number', function: '6', keyboardKey: '6', btnSelector: '[data-number="6"]' },
    { role: 'number', function: '7', keyboardKey: '7', btnSelector: '[data-number="7"]' },
    { role: 'number', function: '8', keyboardKey: '8', btnSelector: '[data-number="8"]' },
    { role: 'number', function: '9', keyboardKey: '9', btnSelector: '[data-number="9"]' },
    { role: 'number', function: '0', keyboardKey: '0', btnSelector: '[data-number="0"]' },
    { role: 'operation', function: '+', keyboardKey: '+', btnSelector: '[data-operation="+"]' },
    { role: 'operation', function: '-', keyboardKey: '-', btnSelector: '[data-operation="-"]' },
    { role: 'operation', function: '*', keyboardKey: '*', btnSelector: '[data-operation="*"]' },
    { role: 'operation', function: '÷', keyboardKey: '/', btnSelector: '[data-operation="÷"]' },
]

// global variables
let mainResult = '0';
let firstOperand = 0;
let currentOperation = '';
let keyElementDurationTimeout;

// setting default values and clearing calculator data
window.onload = () => updateGlobalVariables(clearAll());

// handling clicking on calculator buttons
functionsContainer.addEventListener('click', e => {
    // returns immediately if the user accidentally clicked somewhere between buttons
    if (e.target.tagName !== 'BUTTON') return;

    const {role, value} = determineRole(e.target);
    handleCalculatorActions(role, value);
});

// keyboard event listeners
document.addEventListener('keydown', e => {
    const targetedActionObject = KEYBOARD_KEY_FUNCTION_PAIRS.find(pair => pair.keyboardKey === e.key.toLowerCase());
    if (targetedActionObject === undefined) return;

    if (keyboardKeysContainer.dataset.active === 'true') clearTimeout(keyElementDurationTimeout);

    mainKeyElement.textContent = e.key;
    keyboardKeysContainer.dataset.active = true;

    handleCalculatorActions(targetedActionObject.role, targetedActionObject.function);

    const targetedActionBtn = functionsContainer.querySelector(targetedActionObject.btnSelector);
    targetedActionBtn.dataset.active = true;
});

document.addEventListener('keyup', e => {
    const targetedActionObject = KEYBOARD_KEY_FUNCTION_PAIRS.find(pair => pair.keyboardKey === e.key.toLowerCase());
    if (targetedActionObject === undefined) return;

    keyElementDurationTimeout = setTimeout(() => {
        keyboardKeysContainer.dataset.active = false;
    }, 600);

    const targetedActionBtn = functionsContainer.querySelector(targetedActionObject.btnSelector);
    targetedActionBtn.dataset.active = false;
});

// functions

function handleCalculatorActions(role, value) {
    if (role === 'special-button') {
        handleSpecialButtons(value);
    } else if (role === 'number') {
        mainResult = handleNumber(mainResult, value);
    } else if (role === 'operation') {
        updateGlobalVariables(handleOperation(mainResult, firstOperand, currentOperation, value));
    }

    // if the mainResult doesn't contain dot, let user the option to add it
    if (mainResult.indexOf('.') === -1) enablePointBtn();
    // if the mainResult does contain dot, don't allow the user to add another one
    if (mainResult.indexOf('.') !== -1) disablePointBtn();
}

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
        updateGlobalVariables(clearAll());
    } else if (label === 'DEL') {
        mainResult = handleDEL(mainResult);
    } else if (label === 'point') {
        mainResult = handlePoint(mainResult);
    } else if (label === 'equal') {
        updateGlobalVariables(handleEqual(mainResult, firstOperand, currentOperation));
    }
}

function updateGlobalVariables({newMainResult, newFirstOperand, newCurrentOperation}) {
    mainResult = newMainResult;
    firstOperand = newFirstOperand;
    currentOperation = newCurrentOperation;
}