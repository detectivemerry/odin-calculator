//Calculator logic
const add = function(a,b) {
	return a + b
};

const subtract = function(a,b) {
	return a - b
};

const multiply = function(a,b) {
	return a * b
};

const divide = function(a,b) {
	return a / b
};

const operate = function(noOne,operator,noTwo){
    switch (operator){
        case '+':
            return add(noOne, noTwo);
        case '-':
            return subtract(noOne, noTwo);
        case '*':
            return multiply(noOne, noTwo);
        case '/':
            return divide(noOne, noTwo);
    }
}
let displayValue = 0
const display = document.querySelector('.display')
let isNewDisplay = true

const updateDisplayValue = function(newValue){
    display.textContent = newValue
}

updateDisplayValue(displayValue)

buttons = document.querySelectorAll('.button')
buttons.forEach((button)=>{

    //Add darken effect when mouse over
    button.addEventListener('mouseover', (e)=>{
        e.target.style.backgroundColor = 'darkgray'
    })
    button.addEventListener('mouseout', (e)=>{
        e.target.style.backgroundColor = 'lightgray' 
    })

    //Change display value when selected
    button.addEventListener('click', (e)=>{
        if(isNewDisplay){
            displayValue = e.target.textContent;
            isNewDisplay = false
        }
        else{
            displayValue = displayValue + e.target.textContent;
        }
        updateDisplayValue(displayValue)
    })
})
//Resets calculator display to 0
const clear = function(){
    displayValue = 0
    updateDisplayValue(displayValue)
    isNewDisplay = true
}

//Displays error in calculator display
const displaySyntaxError = function(){
    displayValue = 'Syntax error'
    updateDisplayValue(displayValue)
    setTimeout(clear, 2000)
}

//Display error when user gets infinity
const displayInfinityError = function(){
    displayValue = 'Infintity error, did you just try to divide a number by 0?'
    updateDisplayValue(displayValue)
    setTimeout(clear, 2000)
}

//Computes the equation entered in calculator
const submit = function(){

    const operandsPattern = /[+\-*\/]/;
    let numbers = displayValue.split(operandsPattern)
    numbers[numbers.length - 1] = numbers[numbers.length - 1].replace('=','')
    let operands = Array.from(displayValue).filter((value)=>{
        return !Number(value) && value != '=' && value != '0'
    })
    while(numbers.length > 1){
        try{
            let noOne = Number(numbers[0])
            let noTwo = Number(numbers[1])
            let operand = operands[0]
            console.log(`operate running on 1: ${noOne} and 2: ${noTwo} and operand: ${operands}`)
            let tempNum = operate(noOne, operand, noTwo).toFixed(2);
            numbers.splice(0, 2)
            numbers.splice(0, 0, tempNum)
            operands.splice(0, 1)
        }
        catch{
            displaySyntaxError()
            break
        }
    }
    displayValue = numbers[0]
    if(operands.length > 0){
        displaySyntaxError()
    }
    else if(displayValue == "Infinity"){
        displayInfinityError()
        isNewDisplay = true
    }
    else{
        updateDisplayValue(displayValue)
        isNewDisplay = true
    }
}

const deleteButton = document.querySelector('.button.delete')
deleteButton.addEventListener('click', ()=>{
    displayValue = displayValue.slice(0, -1)
    updateDisplayValue(displayValue)
})
deleteButton.addEventListener('mouseout', (e)=>{
    e.target.style.backgroundColor = 'lightblue' 
})

const clearButton = document.querySelector('.button.clear')
clearButton.addEventListener('click', ()=>{
    clear()
})
clearButton.addEventListener('mouseout', (e)=>{
    e.target.style.backgroundColor = 'lightcoral' 
})

const equalButton = document.querySelector('.button.equals')
equalButton.addEventListener('click', ()=>{
    submit()
})

