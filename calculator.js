const keys = document.querySelectorAll('.keys');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');
const operations = '+-/*';
const keyboardSection = document.querySelector('.keyboard');
let firstNumber;
let secondNumber;
let currentOperation;
let result;
let beginCalculation = true;
let isDecimalActive;
let bottomTextLength;
let keysDisabled;

function disableKeys() {
    keys.forEach(key => {
        if (key.value !== 'reset') {
            key.disabled =  true;
            key.classList.add('disabled');
        }
    })
    keyboardSection.classList.add('disabled');
    keysDisabled = true;
}

function enableKeys() {
    keys.forEach(key => {
        key.disabled = false;
        key.classList.remove('disabled');
    })
    keyboardSection.classList.remove('disabled');
    keysDisabled = false;
}

function performOperation (currentOperation, firstNumber, secondNumber) {

    let zeroMultiplier;
    let answer;

    firstNumber = String(firstNumber).replaceAll(',', '');
    secondNumber = String(secondNumber).replaceAll(',', '');

    //Fix float operation when adding and subtracting them
    if (firstNumber.includes('.') && secondNumber.includes('.') && (currentOperation === '+' || currentOperation === '-')) {
        firstNumberDecimalTailLength = firstNumber.slice(firstNumber.indexOf('.')+1,).length;
        secondNumberDecimalTailLength = secondNumber.slice(secondNumber.indexOf('.')+1,).length;
        
        if (firstNumberDecimalTailLength > secondNumberDecimalTailLength) {
            zeroMultiplier = firstNumberDecimalTailLength;
        } else if (secondNumberDecimalTailLength > firstNumberDecimalTailLength) {
            zeroMultiplier = secondNumberDecimalTailLength;
        } else {
            zeroMultiplier = firstNumberDecimalTailLength;
        }
    }

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (zeroMultiplier){
        firstNumber = firstNumber*(10**zeroMultiplier);
        secondNumber = secondNumber*(10**zeroMultiplier);
    }

    switch (currentOperation) {
        case '+':
            answer = firstNumber + secondNumber;
            break;

        case '-':
            answer = firstNumber - secondNumber;
            break;

        case '*':
            answer = firstNumber * secondNumber;
            break;

        case '/':
            answer = firstNumber / secondNumber;
    }

    if (zeroMultiplier){
        answer/=(10**zeroMultiplier)
    } 

    if (/[a-z]/.test(answer)){
        disableKeys();
        return 'Error/Overflow';
    } else {
        return answer;
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

    if (numberText === 'Error/Overflow') {
        return 'Error/Overflow';
    }

    let formattedNumber = '';
    numberText = (String(numberText).replaceAll(',', ''));
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

    // fix negative numbers with comma after the negative sign
    if (formattedNumber[0] === '-' && formattedNumber[1] === ',') {
        return formattedNumber.replace(',', '');
    } else if (formattedNumber[0] === ',') {
        return formattedNumber.slice(1,);
    } else {
        return formattedNumber;
    }
}

keys.forEach(key => {
    key.addEventListener('click', ev => {
        let buttonPressed = ev.target.value;

        // 16-digit limit
        if (/[0-9]/.test(buttonPressed)) {
            bottomTextLength = bottomScreen.innerText.replaceAll(',', '')
                                                     .replaceAll('.','')
                                                     .length;
            if (bottomTextLength >= 16) {
                alert("You reached max digit input!");
            } else {

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
                    } else if(bottomScreen.innerText !== '0') {
                        bottomScreen.innerText = (commaSeparation(bottomScreen.innerText += buttonPressed));
                    }
                }

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
            // allow operation sign to act like equal sign, when first nubmer exists and something is typed in bottom screen
            // except when the values are equal;
            if (firstNumber && (bottomScreen.innerText !== '0') && (firstNumber != bottomScreen.innerText)) {
                secondNumber = bottomScreen.innerText;
                result = performOperation(currentOperation, firstNumber, secondNumber);
                bottomScreen.innerText = commaSeparation(result);
                firstNumber = result;
                topScreen.innerText = `${firstNumber}${currentOperation}`
                isDecimalActive = true;
                beginCalculation = true;
                result = null;
            } else if (firstNumber) {
                topScreen.innerText = `${firstNumber}${currentOperation}`
                bottomScreen.innerText = '0';
            } else {
                firstNumber = bottomScreen.innerText;
                bottomScreen.innerText = '0';
                topScreen.innerText = `${firstNumber.replaceAll(',', '')}${currentOperation}`
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
                topScreen.innerText = `${String(firstNumber).replaceAll(',', '')}${currentOperation}${secondNumber.replaceAll(',', '')}=`;
                result = performOperation(currentOperation, firstNumber, secondNumber);
                bottomScreen.innerText = commaSeparation(result);
                firstNumber = result;
                isDecimalActive = true;
            }
        }

        // if reset is pressed
        if (buttonPressed === 'reset') {
            if (keysDisabled){
                enableKeys();
            }
            resetCalculation();
            bottomScreen.innerText += '0';
            beginCalculation = true;
        }

        // if del is pressed
        if (buttonPressed === 'del') {
            if (!result) {
                bottomTextLength = bottomScreen.innerText.length;
                if (bottomTextLength > 1) {
                    bottomScreen.innerText = commaSeparation(bottomScreen.innerText.slice(0, bottomTextLength-1))
                } else {
                    bottomScreen.innerText = '0';
                }
            }
        }

    })
})

// add keyboard support here
// create function for every keys, and pass it to keyboard inputs;

