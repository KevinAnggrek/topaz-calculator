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
    numButton.addEventListener('click', handleNumInputs);
});

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', handleOperatorInputs); 
});

clearButton.addEventListener('click', () => {
    clearData();
});

modifierButtons.forEach(modButton => {
    modButton.addEventListener('click', handleModifierInputs);
});

// KeyboardEvent for the Calculator


// DOM & UI Functions
function handleNumInputs(ev) {
    if (currentMode==='ERROR_MODE') { // Check if Calculator is in error due to division by zero
        clearData();
        return;
    }
    let clickedNum = ev.target.innerText;
    if (clickedNum==='0'&& (firstNum==='0' || secondNum==='0')) { // Prevent spamming meaningless zeroes
        return;
    }
    if (currentMode==='FIRST_NUM') {
        firstNum+=clickedNum;
    }
    else {
        secondNum+=clickedNum;
    }
    updateBottomScreen();
}

function handleOperatorInputs(ev) {
    if (currentMode==='ERROR_MODE') {
        clearData();
        return;
    }

    let clickedOperator = ev.target.innerText;

    if (clickedOperator==='=') {
        if (secondNum==='0' && currentOperator==='÷') {
            showDivideByZeroError();
            return;
        }
        performOperation();
    }
    else {
        if (currentMode==='FIRST_NUM') {
            currentOperator=clickedOperator;
            toggleMode();
        }
        else {
            if (secondNum==='0' && currentOperator==='÷') {
                showDivideByZeroError();
                return;
            }
            if (performOperation()) toggleMode();
            currentOperator=clickedOperator;
        }
        updateBottomScreen();
    }
}

function handleModifierInputs(ev) {
    if (currentMode==='ERROR_MODE') {
        clearData();
        return;
    }
    
    let clickedMod = ev.target.innerText;

    if (clickedMod==='←') {
        if (currentMode==='FIRST_NUM' && firstNum!=='') {
            firstNum = firstNum.slice(0,-1);
            updateBottomScreen();
        }
        else if (currentMode==='SECOND_NUM' && secondNum!=='') {
            secondNum = secondNum.slice(0,-1);
            updateBottomScreen();
        }
    }
    else if (clickedMod==='+/-') {
        if (currentMode==='FIRST_NUM' && firstNum!=='') {
            firstNum = '-' + firstNum;
            updateBottomScreen();
        }
        else if (currentMode==='SECOND_NUM' && secondNum!=='') {
            secondNum = '-' + secondNum;
            updateBottomScreen();
        }
    }
    else if (clickedMod==='.') {
        if (currentMode==='FIRST_NUM' && firstNum!=='' && firstNum.indexOf('.') <= -1) {
            firstNum = firstNum + '.';
            updateBottomScreen();
        }
        else if (currentMode==='SECOND_NUM' && secondNum!=='' && secondNum.indexOf('.') <= -1) {
            secondNum = secondNum + '.';
            updateBottomScreen();
        }
    }
}

function updateBottomScreen() {
    bottomScreen.innerHTML = `${firstNum} ${currentOperator} ${secondNum}`;
}

function showDivideByZeroError() {
    bottomScreen.innerHTML = "That would blow up your taxes y'know ヽ(*⌒▽⌒*)ﾉ";
    updateTopScreen();
    currentMode='ERROR_MODE';
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

function performOperation() {
    if (currentOperator!=='' && firstNum!=='' && secondNum!=='') {
        updateTopScreen();
        firstNum = operate(firstNum,currentOperator,secondNum).toString();
        secondNum = '';
        currentOperator = '';
        updateBottomScreen();
        toggleMode();

        return true;
    }
}

function clearData() {
    firstNum='';
    secondNum='';
    currentOperator='';
    currentMode=DEFAULT_MODE;
    bottomScreen.innerHTML='';
    topScreen.innerHTML='';
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
    return roundToPrecision(num1 + num2,5);
}

function subtract(num1,num2) {
    return roundToPrecision(num1 - num2,5);
}

function multiply(num1,num2) {
    return roundToPrecision(num1 * num2,5);
}

function divide(num1,num2) {
    return roundToPrecision(num1 / num2,5);
}

function roundToPrecision(num, precision) {
    return Math.round(num * Math.pow(10,precision)) / Math.pow(10,precision);
}