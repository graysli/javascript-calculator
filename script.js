const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const equalButton = document.querySelector('.equal')
const deleteButton = document.querySelector('.delete')
const clearButton = document.querySelector('.clear')
const prevDisplay = document.querySelector('.prev-display')
const currDisplay = document.querySelector('.curr-display')

pDisplay = '';
display = '';
opr = '';
result = null;
equalPressed = false;
isDecimal = false;

function addNumber(number) {
    if (number === '.' && isDecimal) {
        return;
    }
    if (number === '.' && !isDecimal) {
        isDecimal = true;
    }
    display += number;
    currDisplay.innerText = display;
}

function operate(operation) {
    if (!display) {
        return;
    }
    isDecimal = false;
    if (!pDisplay || !display || !opr) {
        result = parseFloat(display);
    }
    else {
        compute();
    }
    clearVariable(operation);
    opr = operation;
    console.log(result);
}

function compute() {
    switch(opr) {
        case '+':
            result = parseFloat(result) + parseFloat(display);
            break;
        case '-':
            result = parseFloat(result) - parseFloat(display);
            break;
        case '*':
            result = parseFloat(result) * parseFloat(display);
            break;
        case '/':
            result = parseFloat(result) / parseFloat(display);
            break;
        default:
            return;
    }
}

function clear() {
    pDisplay = '';
    display = '';
    result = '';
    prevDisplay.innerText = '0';
    currDisplay.innerText = '0';
}

function clearVariable(name = '') {
    pDisplay += display + ' ' + name + ' ';
    prevDisplay.innerText = pDisplay;
    currDisplay.innerText = '';
    display = '';
    
}

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (equalPressed) {
            clear();
            equalPressed = false;
        }
        addNumber(e.target.innerText);
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        equalPressed = false;
        operate(e.target.innerText);
    })
})

equalButton.addEventListener('click', (e) => {
    if (!display || !pDisplay) {
        return;
    }
    compute();
    clearVariable();
    currDisplay.innerText = result;
    display = result;
    pDisplay = '';
    equalPressed = true;
})

clearButton.addEventListener('click', (e) => {
    clear();
})

deleteButton.addEventListener('click', e => {
    if (display.length > 0) {
        display = display.slice(0, -1);
    }
    currDisplay.innerText = display;
})