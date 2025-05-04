function addition() {
   const firstNumber = Math.floor(Math.random() * 100) + 1;
    const secondNumber = Math.floor(Math.random() * 100 ) + 1;

    return [`${firstNumber} + ${secondNumber}`, firstNumber + secondNumber];
}

function subtraction() {
    const firstNumber = Math.floor(Math.random() * 100) + 1;
    const secondNumber = Math.floor(Math.random() * 100 ) + 1;

    return [`${firstNumber} - ${secondNumber}`, firstNumber - secondNumber];
}


function multiplication() {
    const firstNumber = Math.floor(Math.random() * 20) + 1;
    const secondNumber = Math.floor(Math.random() * 20 ) + 1;

    return [`${firstNumber} * ${secondNumber}`, firstNumber * secondNumber];
}

function division() {
    const firstNumber = Math.floor(Math.random() * 100) + 1;
    const secondNumber = Math.floor(Math.random() * 100 ) + 1;

    return [`${firstNumber} + ${secondNumber}`, firstNumber + secondNumber];
}

const generator = {
    addition: addition,
    subtraction: subtraction,
    multiplication: multiplication,
    division: division,
}

export default generator;