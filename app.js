const prevOpe = document.querySelector("#prev-operation");
const result = document.querySelector("#result");
const buttons = [...document.querySelectorAll("button")];
const operators = ["+", "-", "*", "/"];
let resultArr = [];
let operatorArr = [];
result.textContent = "0";

buttons.forEach(button => {
    button.addEventListener("click", handleButton)
})

function handleButton(e) {
    e.preventDefault();
    const getAttr = e.target.getAttribute("data-attr")
    const addNumber = document.createElement("span")

    if (result.textContent[0] === "0") {
        result.textContent = ""
    }

    if (getAttr === "C") {
        result.textContent = "0"
        prevOpe.textContent = ""
    } else if (getAttr === "CE") {
        const lastChild = result.querySelector("span:last-child")
        if (!result.textContent.length) {
            result.textContent = "0"
        } else if (result.textContent.length > 0) {
            lastChild.remove()
            if (!result.textContent.length) {
                result.textContent = "0"
            }
        }

    } else if (getAttr === "=") {
        //If the last char of the operation is a symbol, we return, else we eval
        const lastChar = result.textContent[result.textContent.length - 1]
        if (operators.includes(lastChar) || lastChar === ".") {
            prevOpe.textContent = "Terminez le calcul par un chiffre"
            setTimeout(() =>{prevOpe.textContent=""},1500)
            return;
        } else if(!operatorArr.length){
            return;
        } else {
            operatorArr = [];
            prevOpe.textContent = result.textContent
            //REPRODUCTION METHODE EVAL
            const resultFunction = new Function('return ' + result.textContent)();
            result.textContent = resultFunction

            //METHODE EVAL
            // result.textContent=eval(result.textContent)
        }
    } else if (operators.includes(getAttr)) {

        if (operators.includes(result.textContent[result.textContent.length - 1])) {
            const lastChild = result.querySelector("span:last-child")
            lastChild.textContent = getAttr
        } else {
            if (!result.textContent.length) {
                result.textContent = "0"
            } else {
                addNumber.textContent = getAttr
                result.appendChild(addNumber)
                operatorArr.push(getAttr)
            }
        }
    } else if (getAttr === ".") {
        resultArr = result.textContent.split(/[+\-*/]/g)
        if (resultArr[resultArr.length - 1].includes(".")) {
            return;
        } else {
            if (!result.textContent.length) {
                result.textContent = "0"
            } else {
                addNumber.textContent = getAttr
                result.appendChild(addNumber)
            }
        }

    } else {
        addNumber.textContent = getAttr
        result.appendChild(addNumber)
        resultArr = result.textContent.split(/[+\-*/]/g)
    }
}

//USEFUL REGEXP
// const arrOperator = result.textContent.match(/[+\-*/]/g)
// const numbers = result.textContent.split(/[+\-*/]/g)