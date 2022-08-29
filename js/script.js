const display = document.querySelector('.display');
const digitButtons = document.querySelectorAll('.digit');
const clear = document.querySelector('.clear');
const operatorButtons = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');

let result = 0;
display.textContent = 0;
let numbers = [];
let operators = [];

Array.from(digitButtons).forEach(item => {
    item.addEventListener('click', () => {
        if (display.textContent.startsWith('0')) display.textContent = '';
        display.textContent += item.textContent;
    })
});

Array.from(operatorButtons).forEach(item => {
    item.addEventListener('click', () => {
        if (display.textContent.startsWith('0')) {
            return false;
        }
        display.textContent += item.textContent;
    })
})

clear.addEventListener('click', () => {
    display.textContent = 0;
    result = 0;
    operators = [];
    numbers = [];
})

equal.addEventListener('click', () => {
    processResult();
    display.textContent = result;
})

const processResult = () => {
    getNumbersArray();
    getOperatorsArray();
    operations();
    return result;
}

const getNumbersArray = () => {
    let numbersString = [];
    numbersString = display.textContent.split();
    numbersString.forEach(item => {
        if (typeof (item) === 'number') {
            numbers.push(item);
        }
    });
}

const getOperatorsArray = () => {
    let operatorsString = [];
    operatorsString = display.textContent.split();
    operators = operatorsString.filter(item => item !== '');
}

const operations = () => {
    result = numbers[0];
    numbers.shift();
    numbers.forEach((item, index) => {
        handleOperators();
        if (operators[index] === "+") { result += item }
        else if (operators[index] === '-') { result -= item }
        else if (operators[index] === '÷') { result /= item }
        else if (operators[index] === 'x') { result *= item };
    })
}
const handleOperators = () => {
    operators.forEach(item => {
        if (item.length >= 2) {
            result = "ERROR";
            return false;
        }
    })
}
