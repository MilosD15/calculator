
// DOM elements
const errorMessageContainer = document.querySelector("[data-error-message]");
const pointBtn = document.querySelector('[data-point]');

// FUNCTIONS THAT ARE DEALING WITH DOM ELEMENTS

export function updateHTML(element, value) {
    element.textContent = value;
}

export function showErrorMessage() {
    errorMessageContainer.dataset.active = true;
    setTimeout(() => {
        errorMessageContainer.dataset.active = false;
    }, 4000);
}

export const disablePointBtn = () => pointBtn.dataset.disabled = true;
export const enablePointBtn = () => pointBtn.dataset.disabled = false;