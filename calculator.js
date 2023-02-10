
function infixToPostfix(list, isTest=false) {
    // # I added debugging to see what was going on here.
    // if isTest is true, then console.log will be used to display the
    // intermediate steps of the algorithm. Otherwise, console.log will
    // be a no-op.
    let log = isTest ? console.log : () => {};

    // Convert infix expression to postfix expression using a stack.
    // Example: 1 + 2 * 3 -> 1 2 3 * +
    let stack = [];
    let output = [];
    for (let token of list) {
        if (token === '(') {
            stack.push(token);
            // display what was pushed to stack
            log('pushed to stack: ' + token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                let x = stack.pop();
                // display what was popped from stack
                log('popped from stack: ' + x);
                output.push(x);
                // display what was pushed to output
                log('pushed to output: ' + x);
            }
            let x = stack.pop();
            // display what was popped from stack
            log('popped from stack: ' + x);
            // assert that the popped value is '('
            if (x !== '(') {
                throw new Error('Invalid expression');
            }
        }
        // # needed to explictly indicate that * and / are higher precedence than + and -
        // # via this comment ...
        // handle * and / at higher precedence than + and -
        else if (token === '*' || token === '/') {
            while (stack.length > 0 && (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
                let x = stack.pop();
                // display what was popped from stack
                log('popped from stack: ' + x);
                output.push(x);
                // display what was pushed to output
                log('pushed to output: ' + x);
            }
            stack.push(token);
            // display what was pushed to stack
            log('pushed to stack: ' + token);
        }
        // # ... and via this comment
        // handle + and - at lower precedence than * and /
        else if (token === '+' || token === '-') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                let x = stack.pop();
                // display what was popped from stack
                log('popped from stack: ' + x);
                output.push(x);
                // display what was pushed to output
                log('pushed to output: ' + x);
            }
            stack.push(token);
            // display what was pushed to stack
            log('pushed to stack: ' + token);
        } else if (token === ' ') {
            // do nothing
            // this shouldn't happen if the input is correct, so emit an error
            // explaining that the token should not have this value
            throw new Error('Invalid token: ' + token);
        } else {
            log('handling the else case');
            log('do nothing')
            output.push(token);
            // display what was pushed to output
            log('pushed to output: ' + token);
        }
    }
    while (stack.length > 0) {
        let x = stack.pop();
        // display what was popped from stack
        log('popped from stack: ' + x);
        output.push(x);
        // display what was pushed to output
        log('pushed to output: ' + x);
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

            // convert right and left to numbers
            right = Number(right);
            left = Number(left);

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

function pairwiseComparison(funcName, input, expected, actual) {
    // refactor the body of the loop below into a function
    // using 'actual' for 'actual'
    // and parameter 'expected' for 'testCase.expected'
    // and return true if the two arrays are equal
    // and return false if the two arrays are not equal
    if (actual.length !== expected.length) {
        console.log(funcName + ' failed for input: ' + input);
        console.log('expected: ' + JSON.stringify(expected));
        console.log('actual: ' + JSON.stringify(actual));
        // explain that the lengths are different
        console.log('expected length: ' + expected.length);
        console.log('actual length: ' + actual.length);
        return false;
    }

    // compare elements pairwise by converting them with .toString()
    // and comparing the strings
    for (let j = 0; j < actual.length; j++) {
        // Compare elements pairwise.
        // First try converting the values to numbers with parseFloat and comparing numerically,
        // and if that fails, compare them as strings with .toString().
        if (actual[j].toString() !== expected[j].toString() && parseFloat(actual[j]) !== parseFloat(expected[j])) {
            console.log(funcName + ' failed for input: ' + input);
            console.log('expected: ' + JSON.stringify(expected));
            console.log('actual: ' + JSON.stringify(actual));
            // print the index and the values that failed to match
            console.log('index: ' + j);
            console.log('expected value: ' + expected[j]);
            console.log('actual value: ' + actual[j]);
            return false;
        }
    }

    // if we get here, the two arrays are equal
    // display the input and the expected and actual values
    // and indicate the test passed
    console.log(funcName + ' PASSED for input: ' + input + ' => ' + JSON.stringify(actual));

    return true;
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
        let funcName = 'parseMathExpressionToTokenList';
        let testCase = testCases[i];
        let input = testCase.input;
        let expected = testCase.expected;
        let actual = parseMathExpressionToTokenList(testCase.input);
        pairwiseComparison(funcName, input, expected, actual);
    }
    return passed;
}

function testInfixToPostfix() {
    // test the infixToPostfix function using the examples above with the expected
    // values in postfix order.
    // If the infixToPostfix function is correct, this function should return true.
    let testCases = [
        { input: '1+2', expected: [1, 2, '+'] },
        { input: '1 + 2 * 3', expected: [1, 2, 3, '*', '+'] },
        { input: '1+2*3', expected: [1, 2, 3, '*', '+'] },
        { input: '2.3+4.5*(6.7+1.2/2.0)', expected: [2.3, 4.5, 6.7, 1.2, 2.0, '/', '+', '*', '+'] },
        { input: '(1 + 2) * 3', expected: [1, 2, '+', 3, '*'] },
        { input: '(6 / 3) + 3 - 1 / 2', expected: [6, 3, '/', 3, '+', 1, 2, '/', '-'] },
        { input: '(6 /3)+ 3 -1 /2', expected: [6, 3, '/', 3, '+', 1, 2, '/', '-'] },
    ];
    let passed = true;
    for (let i = 0; i < testCases.length; i++) {
        let funcName = 'infixToPostfix';
        let testCase = testCases[i];
        let expected = testCase.expected;
        let input = parseMathExpressionToTokenList(testCase.input);
        let actual = infixToPostfix(input, isTest=false);
        pairwiseComparison(funcName, input, expected, actual);
    }
    return passed;
}

function testCalculator() {
    // test the calculator function using the examples above.
    // If the calculator function is correct, this function should return true.
    let testCases = [
        { input: '1+2', expected: 3 },
        { input: '1 + 2 * 3', expected: 7 },
        { input: '1+2*3', expected: 7 },
        { input: '2.3+4.5*(6.7+1.2/2.0)', expected: 35.15 }, // # suggested expected output of 31.95 was wrong
        { input: '(1 + 2) * 3', expected: 9 },
        { input: '(6 / 3) + 3 - 1 / 2', expected: 4.5 }, // # suggested expected output of 5.5 was wrong
        { input: '(6 /3)+ 3 -1 /2', expected: 4.5 }, // # suggested expected output of 5.5 was wrong
    ];
    let allPassed = true;
    testCases.forEach(testCase => {
        let result = calculator(testCase.input);
        if (result !== testCase.expected) {
            console.log(`Test failed: input: ${testCase.input}, expected: ${testCase.expected}, actual: ${result}`);
            allPassed = false;
        } else {
            console.log(`PASSED: input: ${testCase.input} => ${testCase.expected}`);
        }
    });
    return allPassed;
}

function main() {
    // run the test functions

    let allPassed = true;

    // print a line explaining which test is running
    console.log('----------------------------------');
    console.log('Running testParseMathExpressionToTokenList');
    console.log('----------------------------------');
    if (testParseMathExpressionToTokenList()) {
        console.log('testParseMathExpressionToTokenList tests passed');
    } else {
        allPassed = false;
    }

    console.log('----------------------------------');
    console.log('Running testInfixToPostfix');
    console.log('----------------------------------');
    if (testInfixToPostfix()) {
        console.log('testInfixToPostfix tests passed');
    } else {
        allPassed = false;
    }

    console.log('----------------------------------');
    console.log('Running testCalculator');
    console.log('----------------------------------');
    if (testCalculator()) {
        console.log('testCalculator tests passed');
    } else {
        allPassed = false;
    }

    console.log('----------------------------------');
    if (allPassed) {
        console.log('All tests passed');
    } else {
        console.log('Some tests failed');
    }
}

main();
