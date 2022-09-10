
// imports
import { updateHTML, disablePointBtn, showErrorMessage } from "./DOManip.js";
import { calculate, handleConcatenatingNumbers, handleDeletingLastNumber, handleDecimalPointNumber } from "./calculator.js";

// DOM elements
const firstOperandElement = document.querySelector("[data-first-operand]");
const operationElement = document.querySelector("[data-chosen-operation]");
const mainResultElement = document.querySelector("[data-main-result]");

// FUNCTIONS THAT HANDLES CERTAIN ACTIONS RELATED TO CALCULATOR
// (DOM MANIPULATION ALONGSIDE IMPLEMENTING A LITTLE BIT OF LOGIC)

export function handleDEL(mainResult) {
    mainResult = handleDeletingLastNumber(mainResult);
    updateHTML(mainResultElement, mainResult);
    return mainResult;
}

export function handleNumber(mainResult, value) {
    mainResult = handleConcatenatingNumbers(mainResult, value);
    updateHTML(mainResultElement, mainResult);
    return mainResult;
}

export function handleOperation(mainResult, firstOperand, currentOperation, newOperation) {
    const newCalculations = calculate(mainResult, firstOperand, currentOperation);
    if (newCalculations.validExpression === false) {
        showErrorMessage();
        return clearAll();
    }

    updateHTML(mainResultElement, '0');
    updateHTML(firstOperandElement, handleDecimalPointNumber(Number(newCalculations.mainResult)));
    updateHTML(operationElement, newOperation);
    
    return {
        newMainResult: '0',
        newFirstOperand: handleDecimalPointNumber(Number(newCalculations.mainResult)),
        newCurrentOperation: newOperation
    }
}

export function handleEqual(mainResult, firstOperand, currentOperation) {
    const newCalculations = calculate(mainResult, firstOperand, currentOperation);
    if (newCalculations.validExpression === false) {
        showErrorMessage();
        return clearAll();
    }

    updateHTML(mainResultElement, newCalculations.mainResult);
    updateHTML(firstOperandElement, '');
    updateHTML(operationElement, '');

    return {
        newMainResult: newCalculations.mainResult,
        newFirstOperand: newCalculations.firstOperand,
        newCurrentOperation: ''
    }
}

export function handlePoint(mainResult) {
    // don't change anything if dot is already active
    if (mainResultElement.textContent.includes('.')) return mainResult;

    updateHTML(mainResultElement, mainResult += '.');
    disablePointBtn();
    return mainResult;
}

export function clearAll() {
    updateHTML(mainResultElement, 0);
    updateHTML(firstOperandElement, '');
    updateHTML(operationElement, '');

    return {
        newMainResult: '0',
        newFirstOperand: 0,
        newCurrentOperation: ''
    }
}