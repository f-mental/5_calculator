const keys = document.querySelectorAll('.keys');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');
const operations = "+-/*";
let firstNumber;
let secondNumber;
let currentOperation;
let result;
let beginCalculation = true;
let beginFromFirst;
let fromPreviousCalculation;

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


/* TO DOS */ 
// fix main bugs
// disable/fix equal sign, disable equal sign from begin calculation phase
// disable/fix operation input when needed --> when both numbers exist and operation is inputted, it will be treated as equal sign
// add support for decimals
// add support for delete, reset, turn off
// add keyboard support

keys.forEach(key => {
    key.addEventListener('click', ev => {
        if (beginCalculation) {
            beginCalculation = false;
            if (!firstNumber){
                if (fromPreviousCalculation) {
                    return;
                } else {
                    bottomScreen.innerText = '';
                }
            }

            if (operations.includes(ev.target.value) && (!firstNumber)) {
                currentOperation = ev.target.value;
                firstNumber = 0;
                bottomScreen.innerText = firstNumber;
                topScreen.innerText = `${firstNumber}${currentOperation}`;
                beginFromFirst = true;
                if (currentOperation && operations.includes(ev.target.value)) {
                    bottomScreen.innerText = firstNumber;
                    beginCalculation = true;
                }
            } else if (ev.target.value === '=') {
                currentOperation = ev.target.value;
                firstNumber = 0;
                bottomScreen.innerText = firstNumber;
                topScreen.innerText = `${firstNumber}${currentOperation}`;
                beginCalculation = true;
            } else {
                bottomScreen.innerText += ev.target.value;
            }

        } else {
            if (firstNumber || beginFromFirst) {
                if (secondNumber) {
                    if (ev.target.value === '=') { /*<----- item2*/
                        if (!result) {
                            secondNumber = bottomScreen.innerText;
                            beginFromFirst = false;
                        }
                        topScreen.innerText = `${firstNumber}${currentOperation}${secondNumber}=`;
                        result = performOperation(currentOperation, firstNumber, secondNumber);
                        bottomScreen.innerText = result;
                        firstNumber = result;
                    } else {
                        if (result && firstNumber && secondNumber) {
                            // reset input when all both numbers and result exist
                            if (/\d/.test(ev.target.value)) {
                                result = 0;
                                firstNumber = 0;
                                secondNumber = 0;
                                bottomScreen.innerText = '';
                                topScreen.innerText = '';
                                beginCalculation = true;
                                // fixed by adding a new flag
                                fromPreviousCalculation = true;
                            } else if (operations.includes(ev.target.value)) {
                                bottomScreen.innerText = '';
                                currentOperation = ev.target.value;
                                firstNumber = result;
                                topScreen.innerText = `${firstNumber}${currentOperation}`;
                                secondNumber = 0
                                result = 0;
                                // there's a bug here, second number accepts first digit
                                // fixed by adding a new flag
                                fromPreviousCalculation = true;
                            }
                        }
                        if (fromPreviousCalculation) {
                            bottomScreen.innerText = '';
                            fromPreviousCalculation = false;
                        } else {
                            bottomScreen.innerText += ev.target.value;
                        }
                    }
                } else { 
                    if (operations.includes(ev.target.value)) {
                        if (currentOperation && operations.includes(ev.target.value) && (!fromPreviousCalculation)) {
                            currentOperation = ev.target.value;
                            topScreen.innerText = `${firstNumber}${currentOperation}`;
                            bottomScreen.innerText = firstNumber;
                            beginFromFirst = true;
                        } else {
                            currentOperation = ev.target.value;
                            firstNumber = bottomScreen.innerText;
                            topScreen.innerText = `${firstNumber}${currentOperation}`;
                            beginFromFirst = true;
                        }
                    } else {
                        if (currentOperation && operations.includes(ev.target.value)) {
                            currentOperation = ev.target.value;
                            topScreen.innerText = `${firstNumber}${currentOperation}`;
                            bottomScreen.innerText = firstNumber;
                            beginFromFirst = true;
                        } else {
                            if (!beginFromFirst) {
                                bottomScreen.innerText = '';
                            }
                            bottomScreen.innerText += ev.target.value;
                            secondNumber = bottomScreen.innerText;
                        }
                    }
                }
            } else {
                if (operations.includes(ev.target.value)) {
                    if (currentOperation && operations.includes(ev.target.value) && (!fromPreviousCalculation)) {
                        bottomScreen.innerText = firstNumber;
                        beginFromFirst = true;
                    } else {
                        currentOperation = ev.target.value;
                        firstNumber = bottomScreen.innerText;
                        topScreen.innerText = `${firstNumber}${currentOperation}`;
                        fromPreviousCalculation = false;
                    }
                } else {
                    bottomScreen.innerText += ev.target.value;
                }
            }
        }
    })
})


/* KEYBOARD SUPPORT */
// document.addEventListener('keyup', ev => {
//     bottom.innerText += ev.key;
// })
