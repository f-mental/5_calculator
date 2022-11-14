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
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
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

function commaSeparation(numberText) {
    let trailingDecimal;
    let decimalIndex;
    let formattedNumber = '';
    numberText = numberText.replaceAll(',', '')
    if (numberText.includes('.')) {
        decimalIndex = numberText.indexOf('.');
        trailingDecimal = numberText.slice(decimalIndex,)
        let j = 0;
        for (let i = decimalIndex-1; i>-1; i--) {
                j += 1;
                if (j % 3 === 0) {
                    formattedNumber = ',' + numberText[i] + formattedNumber;
                } else {
                    formattedNumber = numberText[i] + formattedNumber;
                }
        }
        formattedNumber += trailingDecimal;
    } else {
        decimalIndex = numberText.length;
        let j = 0;
        for (let i = decimalIndex-1; i>-1; i--) {
                j += 1;
                if (j % 3 === 0) {
                    formattedNumber = ',' + numberText[i] + formattedNumber;
                } else {
                    formattedNumber = numberText[i] + formattedNumber;
                }
        
        }
    }

    if (formattedNumber[0] === ',') {
        return formattedNumber.slice(1,);
    } else {
        return formattedNumber;
    }
}


// apply comma separation
// allow operation sign to act like equal sign, when first nubmer exists and something is typed in bottom screen
// check for any bugs
// below is what happening with floats, check it thoroughly
// float -> https://www.w3schools.com/js/js_numbers.asp


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
                isDecimalActive = false;
                // when a different number is pressed when there is an ongoing calculation
                resetCalculation();
                bottomScreen.innerText += buttonPressed;
            } else if ((bottomScreen.innerText === '0')) {
                bottomScreen.innerText = '';
                bottomScreen.innerText += buttonPressed;
            }else {
                bottomScreen.innerText += buttonPressed;
                bottomScreen.innerText = commaSeparation(bottomScreen.innerText)
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
                bottomScreen.innerText += buttonPressed;
                beginCalculation = false;
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
                bottomScreen.innerText = '0';
                topScreen.innerText = `${firstNumber}${currentOperation}`
            };
        }


        // if equalsign is pressed
        if (buttonPressed === '=') {
            if (!firstNumber) {
                topScreen.innerText = `${bottomScreen.innerText}=`
                beginCalculation = true;
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
            if (!result) {
                let bottomTextLength = bottomScreen.innerText.length;
                if (bottomTextLength > 1) {
                    bottomScreen.innerText = bottomScreen.innerText.slice(0, bottomTextLength-1)
                } else {
                    bottomScreen.innerText = '0';
                }
            }
        }

    })
})

// add keyboard support here
