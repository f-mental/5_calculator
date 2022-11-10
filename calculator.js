const keys = document.querySelectorAll('.keys');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');
const operations = /[+-/*//]/;
let firstNumber;
let secondNumber;
let currentOperation;
let result;

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
        if (bottomScreen.innerText === '0') {
            bottomScreen.innerText = '';
            bottomScreen.innerText += ev.target.value;
        } else {
            if (firstNumber) {
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
