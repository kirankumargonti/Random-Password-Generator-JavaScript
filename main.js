// Dealing With the DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('passwordLength');
const upperCaseEl = document.getElementById('upperCase');
const lowerCaseEl = document.getElementById('lowerCase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunction = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Event Listener for generate button
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = upperCaseEl.checked;
    const hasLower = lowerCaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

//Copy Password To clipboard
clipboardEl.addEventListener('click', ()=> {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password Copied To The Clipboard!");
});

//GeneratePassword function

function generatePassword(upper, lower, number, symbol, length) {

    // 1. Intiailizing Password Variable

    let generatedPassword = '';

    const typesCount = upper+ lower + number + symbol;
    //console.log("typesCount: ", typesCount);
    //2. Filter out unchecked Types
    const typesArr = [ {upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
        );
    //console.log("typesCount: ", typesArr);
    //3. Loop over length call generate function for each typee
    if(typesCount == 0) {
        return '';
    }

    for (let i= 0; i<length; i+= typesCount) {
        typesArr.forEach(type => {
             const funcName = Object.keys(type)[0]; 
             //console.log(funcName);

             generatedPassword += randomFunction[funcName]();

        });
    }

    //4. Slicing the generated password
    
    //5. Add final Password to the Password Variable and Return
    finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

    
}




// Function Generation

function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}


function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[]=<>?/.,';
    return symbol[Math.floor(Math.random() * symbol.length)];
}



getRandomUpperCase();
getRandomLowerCase();
getRandomNumber();
getRandomSymbol();