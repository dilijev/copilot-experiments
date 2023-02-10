
function infixToPostfix(list) {
    // Convert infix expression to postfix expression using a stack.
    // Example: 1 + 2 * 3 -> 1 2 3 * +
    let stack = [];
    let output = [];
    for (let token of list) {
        if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else if (token === '*' || token === '/' || token === '+' || token === '-') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.push(token);
        } else {
            output.push(token);
        }
    }
    while (stack.length > 0) {
        output.push(stack.pop());
    }
    return output;
}

function evalutePostfix(list) {
    // Given an list of tokens in postfix order, evaluate the expression for a
    // 4 function calculator with parentheses.
    // Example in postfix: 1 2 3 * + -> 7
    let stack = [];
    for (let token of list) {
        if (token === '*' || token === '/' || token === '+' || token === '-') {
            let right = stack.pop();
            let left = stack.pop();
            if (token === '*') {
                stack.push(left * right);
            } else if (token === '/') {
                stack.push(left / right);
            } else if (token === '+') {
                stack.push(left + right);
            } else if (token === '-') {
                stack.push(left - right);
            }
        } else {
            stack.push(token);
        }
    }

    // ensure that the stack has 1 element, or throw an error
    if (stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    // return the result
    return stack.pop();
}


function parseMathExpressionToTokenList(inputString) {
    // Given a string as input containing a mathematical expression,
    // parse it into tokens.
    // The tokens are not delimited by spaces, but the input is guaranteed
    // to be non-ambiguous. Use a state machine to parse the input, locating
    // the operators and the operands and adding them to a list of tokens.
    //
    // The valid operators are are:
    // * is multiplication
    // / is division
    // + is addition
    // - is subtraction
    // ( and ) are parentheses
    //
    // Numbers may contain a decimal point and may not be negative.
    // There is no unary minus.
    //
    // Example: 1 + 2 * 3 -> 7
    // Example: 2.3+4.5*(6.7+1.2/2.0) -> 31.95
    let tokens = [];
    let state = 'start';
    let token = '';
    for (let i = 0; i < inputString.length; i++) {
        let char = inputString[i];
        if (state === 'start') {
            if (char === ' ') {
                // ignore whitespace
            } else if (char === '*' || char === '/' || char === '+' || char === '-') {
                tokens.push(char);
            } else if (char === '(' || char === ')') {
                tokens.push(char);
            } else if (char >= '0' && char <= '9') {
                token += char;
                state = 'number';
            } else {
                throw new Error('Invalid input');
            }
        } else if (state === 'number') {
            if (char >= '0' && char <= '9') {
                token += char;
            } else if (char === '.') {
                token += char;
                state = 'decimal';
            } else {
                // # Needed this prompt to fix a bug.
                // convert token to a number
                token = parseFloat(token);
                tokens.push(token);
                token = '';
                state = 'start';
                i--;
            }
        } else if (state === 'decimal') {
            if (char >= '0' && char <= '9') {
                token += char;
            } else {
                tokens.push(token);
                token = '';
                state = 'start';
                i--;
            }
        }
    }

    // # apparently it wasn't finished generating this function,
    // # but it added this when I went back and prompted it after the test failed.

    // return the list of tokens
    if (token !== '') {
        tokens.push(token);
    }
    return tokens;
}

function calculator(inputString) {
    // write a 4-function calculator with parentheses that parses the input string as tokens
    // using the parseMathExpressionToTokenList function
    // converts that list to postfix notation using the infixToPostfix function
    // and evaluates the expression in postfix notation using the evalutePostfix function
    //
    // Operators are:
    // * is multiplication
    // / is division
    // + is addition
    // - is subtraction
    // ( and ) are parentheses
    //
    // Operands may contain a decimal point and may not be negative.
    // There is no unary minus.
    //
    // Input string is guaranteed to be non-ambiguous.
    //
    // Example: 1 + 2 * 3 -> 7
    // Example: 2.3+4.5*(6.7+1.2/2.0) -> 31.95
    let tokens = parseMathExpressionToTokenList(inputString);
    let postfix = infixToPostfix(tokens);
    return evalutePostfix(postfix);
}

// test the parseMathExpressionToTokenList function
function testParseMathExpressionToTokenList() {
    // test the parseMathExpressionToTokenList function using the examples above.
    // If the parseMathExpressionToTokenList function is correct, this function should return true.
    let testCases = [
        { input: '1+2', expected: [1, '+', 2] },
        { input: '1 + 2 * 3', expected: [1, '+', 2, '*', 3] },
        { input: '1+2*3', expected: [1, '+', 2, '*', 3] },
        { input: '2.3+4.5*(6.7+1.2/2.0)', expected: [2.3, '+', 4.5, '*', '(', 6.7, '+', 1.2, '/', 2.0, ')'] },
        { input: '(1 + 2) * 3', expected: ['(', 1, '+', 2, ')', '*', 3] },
        { input: '(6 / 3) + 3 - 1 / 2', expected: ['(', 6, '/', 3, ')', '+', 3, '-', 1, '/', 2] },
        { input: '(6 /3)+ 3 -1 /2', expected: ['(', 6, '/', 3, ')', '+', 3, '-', 1, '/', 2] },
    ];
    let passed = true;
    for (let i = 0; i < testCases.length; i++) {
        let testCase = testCases[i];
        let actual = parseMathExpressionToTokenList(testCase.input);
        if (JSON.stringify(actual) !== JSON.stringify(testCase.expected)) {
            console.log('testParseMathExpressionToTokenList failed for input: ' + testCase.input);
            console.log('expected: ' + JSON.stringify(testCase.expected));
            console.log('actual: ' + JSON.stringify(actual));
            passed = false;
        }
    }
    return passed;
}

function testInfixToPostfix() {
    // test the infixToPostfix function using the examples above.
    // If the infixToPostfix function is correct, this function should return true.
    let testCases = [
        { input: '1+2', expected: [1, '+', 2] },
        { input: '(2*3)', expected: [2, 3, '*'] },
        { input: '1 + 2 * 3', expected: [1, 2, 3, '*', '+'] },
        { input: '2.3+4.5*(6.7+1.2/2.0)', expected: [2.3, 4.5, 6.7, 1.2, 2.0, '/', '+', '*', '+'] },
        { input: '(1 + 2) * 3', expected: [1, 2, '+', 3, '*'] },
        { input: '(6 / 3) + 3 - 1 / 2', expected: [6, 3, '/', 3, '+', 1, 2, '/', '-'] },
        { input: '(6 /3)+ 3 -1 /2', expected: [6, 3, '/', 3, '+', 1, 2, '/', '-'] },
    ];
    let passed = true;
    for (let i = 0; i < testCases.length; i++) {
        let testCase = testCases[i];
        let actual = infixToPostfix(testCase.input);
        // compare actual and expected by converting each item to strings
        // and comparison the items pairwise
        for (let j = 0; j < actual.length; j++) {
            if (actual[j] !== testCase.expected[j]) {
                console.log('testInfixToPostfix failed for input: ' + testCase.input);
                console.log('expected: ' + JSON.stringify(testCase.expected));
                console.log('actual: ' + JSON.stringify(actual));
                passed = false;
            }
        }

        if (JSON.stringify(actual) !== JSON.stringify(testCase.expected)) {
            console.log('testInfixToPostfix failed for input: ' + testCase.input);
            console.log('expected: ' + JSON.stringify(testCase.expected));
            console.log('actual: ' + JSON.stringify(actual));
            passed = false;
        }
    }
    return passed;
}

function testCalculator() {
    // test the calculator function using the examples above.
    // If the calculator function is correct, this function should return true.
    let testCases = [
        { input: '1 + 2 * 3', expected: 7 },
        { input: '2.3+4.5*(6.7+1.2/2.0)', expected: 31.95 },
        { input: '(1 + 2) * 3', expected: 9 },
        { input: '(6 / 3) + 3 - 1 / 2', expected: 5.5 },
        { input: '(6 /3)+ 3 -1 /2', expected: 5.5 },
    ];
    let allPassed = true;
    testCases.forEach(testCase => {
        let result = calculator(testCase.input);
        if (result !== testCase.expected) {
            console.log(`Test failed: input: ${testCase.input}, expected: ${testCase.expected}, actual: ${result}`);
            allPassed = false;
        }
    });
    return allPassed;
}

function main() {
    // run the test functions
    if (testParseMathExpressionToTokenList()) {
        console.log('testParseMathExpressionToTokenList passed');
    }
    if (testInfixToPostfix()) {
        console.log('testInfixToPostfix passed');
    }
    if (testCalculator()) {
        console.log('All tests passed');
    }
}

main();
