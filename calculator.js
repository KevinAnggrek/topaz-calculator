// Calculation Variables
const DEFAULT_MODE = 'FIRST_NUM';

let firstNum='';
let currentOperator='';
let secondNum='';
let currentMode = DEFAULT_MODE;

// DOM Objects
const topScreen = document.querySelector('.top-screen');
const bottomScreen = document.querySelector('.bottom-screen');
const numButtons = Array.from(document.querySelectorAll('.num-button'));
const operatorButtons= Array.from(document.querySelectorAll('.operator-button'));
const modifierButtons = Array.from(document.querySelectorAll('.modifier-button'));
const clearButton = document.querySelector('.clear-button');

// DOM Event Listeners
numButtons.forEach((numButton) => {
    numButton.addEventListener('click', (e) => {
        let clickedNum = e.target.innerText;
        if (currentMode==='FIRST_NUM') {
            firstNum+=clickedNum;
        }
        else {
            secondNum+=clickedNum;
        }
        updateBottomScreen();
    });
});

operatorButtons.forEach((operatorButton) => {
    if (operatorButton.innerHTML==='=') {
        operatorButton.addEventListener('click', (e) => {
            if (currentOperator!=='' && firstNum!=='' && secondNum!=='') {
                updateTopScreen();
                firstNum = operate(firstNum,currentOperator,secondNum);
                secondNum = '';
                currentOperator = '';
                updateBottomScreen();
                toggleMode();
            }
        });
    }
    else {
        operatorButton.addEventListener('click', (e) => {
            let clickedOperator = e.target.innerText;
            if (currentMode==='FIRST_NUM') {
                currentOperator=clickedOperator;
                toggleMode();
            }
            else { // Allows for reassignment of operator
                if (secondNum==='') {
                    currentOperator=clickedOperator;
                }
            }
            updateBottomScreen();
        });
    }
});

clearButton.addEventListener('click', () => {
    firstNum='';
    secondNum='';
    currentOperator='';
    currentMode=DEFAULT_MODE;
    bottomScreen.innerHTML='';
    topScreen.innerHTML='';
})

// DOM & UI Functions
function updateBottomScreen() {
    bottomScreen.innerHTML = `${firstNum} ${currentOperator} ${secondNum}`;
}

function updateTopScreen() {
    topScreen.innerHTML = `${firstNum} ${currentOperator} ${secondNum} =`;
}

function toggleMode() {
    if (currentMode==='FIRST_NUM') {
        currentMode='SECOND_NUM';
    }
    else if (currentMode==='SECOND_NUM') {
        currentMode='FIRST_NUM';
    }
}

// Operation Functions
function operate(firstNum, operator, secondNum) {
    if (operator==='+'){
        return add(Number(firstNum),Number(secondNum));
    }
    else if (operator==='-') {
        return subtract(Number(firstNum),Number(secondNum));
    }
    else if (operator==='×') {
        return multiply(Number(firstNum),Number(secondNum));
    }
    else if (operator==='÷') {
        return divide(Number(firstNum),Number(secondNum));
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