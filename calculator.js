const keys = document.querySelectorAll('.keys');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');
const operations = /[+-/*//]/;
let firstNumber;
let secondNumber;
let currentOperation;
let result;
let beginCalculation = true;
let beginFromFirst = false;

function performOperation (currentOperation, firstNumber, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
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

keys.forEach(key => {
    key.addEventListener('click', ev => {
        if (beginCalculation) {
            beginCalculation = false;
            bottomScreen.innerText = '';
            bottomScreen.innerText += ev.target.value;
        } else {
            if (firstNumber || beginFromFirst) {
                beginFromFirst = false;
                if (secondNumber) {
                    if (ev.target.value === '=') {
                        if (!result) {
                            secondNumber = bottomScreen.innerText;
                        }   
                        topScreen.innerText = `${firstNumber}${currentOperation}${secondNumber}=`
                        result = performOperation(currentOperation, firstNumber, secondNumber);
                        bottomScreen.innerText = result;
                        firstNumber = result;
                    } else {
                        if (result && firstNumber && secondNumber) {
                            // reset input when all both numbers and result exist
                            if (/d/.test(ev.target.value)) {
                                result = 0;
                                firstNumber = 0;
                                secondNumber = 0;
                                bottomScreen.innerText = '';
                                topScreen.innerText = '';
                            } else if (operations.test(ev.target.value)) {
                                currentOperation = ev.target.value;
                                firstNumber = result;
                                topScreen.innerText = `${firstNumber}${currentOperation}`
                                secondNumber = 0;
                                beginFromFirst = true;
                            }
                        }
                        bottomScreen.innerText += ev.target.value;
                    }
                } else {
                    bottomScreen.innerText = '';
                    bottomScreen.innerText += ev.target.value;
                    secondNumber = bottomScreen.innerText;
                } 
            } else {
                if (operations.test(ev.target.value)) {
                    currentOperation = ev.target.value;
                    firstNumber = bottomScreen.innerText;
                    topScreen.innerText = firstNumber + ev.target.value;
                } else {
                    bottomScreen.innerText += ev.target.value;
                }
            }
        }
    })
})



// document.addEventListener('keyup', ev => {
//     bottom.innerText += ev.key;
// })
