const keys = document.querySelectorAll('.keys');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');
const operations = '+-/*';
let firstNumber;
let secondNumber;
let currentOperation;
let result;
let beginCalculation = true;
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

function resetCalculation () {
    firstNumber = null;
    secondNumber = null;
    result = null;
    bottomScreen.innerText = '';
    topScreen.innerText = '';
}

// below is what happening with floats, check it thoroughly
// float -> https://www.w3schools.com/js/js_numbers.asp
// apply comma separation
// check for any bugs

keys.forEach(key => {
    key.addEventListener('click', ev => {
        let buttonPressed = ev.target.value;

        // if digit is pressed
        if (/[1-9]/.test(buttonPressed)) {
            //if the calculator program is just started, beginCalculation flag is set to true
            if (beginCalculation){
                beginCalculation = false;
                bottomScreen.innerText = '';
                bottomScreen.innerText += buttonPressed;
            } else if (result || (result === 0)) {
                // when a different number is pressed when there is an ongoing calculation
                resetCalculation();
                bottomScreen.innerText += buttonPressed;
            } else if ((bottomScreen.innerText === '0')) {
                bottomScreen.innerText = '';
                bottomScreen.innerText += buttonPressed;
            }else {
                bottomScreen.innerText += buttonPressed;
            }

        }

        // if zero is pressed
        if (buttonPressed === '0') {
            if (result || (result === 0)) {
                resetCalculation();
                bottomScreen.innerText += buttonPressed;
                beginCalculation = true;
            }        
            else if (firstNumber) {
                bottomScreen.innerText += buttonPressed;
            } else if(!(bottomScreen.innerText === '0')) {
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
                bottomScreen.innerText = '0';
            } else {
                firstNumber = bottomScreen.innerText;
                topScreen.innerText = `${firstNumber}${currentOperation}`
                beginCalculation = true;
            };
        }


        // if equalsign is pressed
        if (buttonPressed === '=') {
            if (!firstNumber) {
                topScreen.innerText = `${bottomScreen.innerText}=`
            } else {
                if (!result) {
                    secondNumber = bottomScreen.innerText;
                }
                topScreen.innerText = `${firstNumber}${currentOperation}${secondNumber}=`;
                result = performOperation(currentOperation, firstNumber, secondNumber);
                bottomScreen.innerText = result;
                firstNumber = result;
                isDecimalActive = true;
            }
        }

        // if reset is pressed
        if (buttonPressed === 'reset') {
            resetCalculation();
            bottomScreen.innerText += '0';
            beginCalculation = true;
        }

        // if del is pressed
        if (buttonPressed === 'del') {
            // if (result) {
            //     let lastBottomDisplay = bottomScreen.innerText;
            //     resetCalculation();
            //     bottomScreen.innerText = lastBottomDisplay
            //     beginCalculation = true;
            // } else {}
                let bottomTextLength = bottomScreen.innerText.length;
                if (bottomTextLength > 1) {
                    bottomScreen.innerText = bottomScreen.innerText.slice(0, bottomTextLength-1)
                } else {
                    bottomScreen.innerText = '0';
                }
        }

    })
})

// add keyboard support here
