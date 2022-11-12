const keys = document.querySelectorAll('.keys');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');
const operations = '+-/*';
let firstNumber;
let secondNumber;
let currentOperation;
let result;
let beginCalculation = true;
let beginFromFirst;
let isDecimalActive;

function performOperation (currentOperation, firstNumber, secondNumber) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    switch (currentOperation) {
        case '+':
            return firstNumber + secondNumber

        case '-':
            return firstNumber - secondNumber

        case '*':
            return firstNumber * secondNumber

        case '/':
            return firstNumber / secondNumber
    }
}

// not sure what is happening with floats, check it thoroughly

keys.forEach(key => {
    key.addEventListener('click', ev => {
        let buttonPressed = ev.target.value;

        // if digit is pressed
        if (/\d/.test(buttonPressed)) {
            //if the calculator program is just started, beginCalculation flag is set to true
            if (beginCalculation){
                beginCalculation = false;
                bottomScreen.innerText = '';
                bottomScreen.innerText += buttonPressed;
            } else if (result && firstNumber && secondNumber) {
                // when a different number is pressed when there is an ongoing calculation
                console.log('here');
                result = null;
                firstNumber = null;
                secondNumber = null;
                bottomScreen.innerText = '';
                topScreen.innerText = '';
                bottomScreen.innerText += buttonPressed;
            } else if (firstNumber && (!beginFromFirst)) {
                bottomScreen.innerText = '';
                bottomScreen.innerText += buttonPressed;
                // beginFromFirst flag is set to true to indicate that the secondNumber is about to 
                // be generated
                beginFromFirst = true; 
            } else if (beginFromFirst) {
                bottomScreen.innerText += buttonPressed; 
            } else {
                bottomScreen.innerText += buttonPressed;
            }

        }

        // if decimal is pressed
        if (buttonPressed === '.') {
            if (!isDecimalActive){
                isDecimalActive = true;
                beginCalculation = false;
                bottomScreen.innerText += buttonPressed;
            }
        }

        // if operation symbol is pressed
        if (operations.includes(buttonPressed)) {
            result = null;
            currentOperation = buttonPressed;
            isDecimalActive = false;
            if (firstNumber) {
                topScreen.innerText = `${firstNumber}${currentOperation}`
            } else {
                firstNumber = bottomScreen.innerText;
                topScreen.innerText = `${firstNumber}${currentOperation}`
            };
        }


        // if equalsign is pressed
        if (buttonPressed === '=') {
            if (!firstNumber) {
                topScreen.innerText = `${bottomScreen.innerText}=`
            } else {
                secondNumber = bottomScreen.innerText;
                beginFromFirst = false;
                topScreen.innerText = `${firstNumber}${currentOperation}${secondNumber}=`;
                result = performOperation(currentOperation, firstNumber, secondNumber);
                bottomScreen.innerText = result;
                firstNumber = result;
            }
        }


        // if reset is pressed


        // if del is pressed



    })
})

// add keyboard support here
