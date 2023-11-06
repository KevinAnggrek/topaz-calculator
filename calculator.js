// Calculation Variables
let firstNum;
let operator;
let secondNum;

// Operation Functions
function operate(firstNum, operator, secondNum) {
    if (operator==='+'){
        return add(firstNum,secondNum);
    }
    else if (operator==='-') {
        return subtract(firstNum,secondNum);
    }
    else if (operator==='x') {
        return multiply(firstNum,secondNum);
    }
    else if (operator==='/') {
        return divide(firstNum,secondNum);
    }
}

// Math Functions
function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    return num1 / num2;
}