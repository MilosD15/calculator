
// DOM elements
const firstOperandElement = document.querySelector("[data-first-operand]");
const operationElement = document.querySelector("[data-chosen-operation]");
const mainResultElement = document.querySelector("[data-main-result]");
const functionsContainer = document.querySelector("[data-functions]");

// global variables
let mainResult = 0;
let firstOperand = 0;
let currentOperation = '';

function printGlobalVariables() {
    console.log('Main result: ' + mainResult);
    console.log('First operand: ' + firstOperand);
    console.log('Current operation: ' + currentOperation);
}


window.onload = () => clearAll();

functionsContainer.addEventListener('click', e => {
    const {role, value} = determineRole(e.target);
    if (role === 'special-button') {
        handleSpecialButtons(value);
    } else if (role === 'number') {
        // CONTINUE HERE...
    } else if (role === 'operation') {

    }
});

function handleSpecialButtons(label) {
    if (label === 'AC') {
        clearAll();
    } else if (label === 'DEL') {
        mainResult = handleDeletingLastNumber(mainResult);
        updateHTML(mainResultElement, mainResult);
    } else if (label === 'point') {

    } else if (label === 'equal') {

    }
}

function determineRole(button) {
    if (button.dataset.ac) return { role: 'special-button', value: 'AC' }
    if (button.dataset.del) return { role: 'special-button', value: 'DEL' }
    if (button.dataset.point) return { role: 'special-button', value: 'point' }
    if (button.dataset.equal) return { role: 'special-button', value: 'equal' }
    if (button.dataset.number) return { role: 'number', value: button.dataset.number }
    if (button.dataset.operation) return { role: 'operation', value: button.dataset.operation }
}

function clearAll() {
    if (mainResult === 0 && firstOperand === 0 && currentOperation === '') return;
    
    mainResult = 0;
    firstOperand = 0;
    currentOperation = '';

    updateHTML(mainResultElement, 0);
    updateHTML(firstOperandElement, '');
    updateHTML(operationElement, '');
}

function handleDeletingLastNumber(mainResult) {
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

function updateHTML(element, value) {
    element.textContent = value;
}