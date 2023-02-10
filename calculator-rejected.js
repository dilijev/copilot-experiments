function calculator_WorksForInputSpaceDelimited(inputString) {
    // Given a string as input containing a mathematical expression,
    // where the tokens may or may not be delineated by spaces
    // and valid tokens are:
    // * is multiplication
    // / is division
    // + is addition
    // - is subtraction
    // ( and ) are parentheses
    // Parse the input into a list of tokens, convert the list of tokens
    // to a list of tokens in postfix notation, and evaluate the expression
    // in postfix notation.
    // Example: 1 + 2 * 3 -> 7
    // Example in postfix: 1 2 3 * + -> 7
    let tokens = inputString.split(' ');
    let postfix = infixToPostfix(tokens);
    return evalutePostfix(postfix);
    // #
    // # Not quite right. It assumes input is delimited by spaces.
    // #
}

// write a 4-function calculator with parentheses that parses the input string as tokens
// * is multiplication
// / is division
// + is addition
// - is subtraction
// ( and ) are parentheses
// Examples:
// (1 + 2) * 3 = 9
// (6 / 3) + 3 - 1 / 2 = 5.5
function calculatorMeh(input) {
    input.split(' ').forEach(token => {
        // create a stack
        let operands = [];
        let operators = [];

        // if token is a number, push it to the stack
        if (token === '(') {
            // push the operator to the stack

            // push the current state of the calculator to the stack
            // reset the calculator
        } else if (token === ')') {
            // pop the last two numbers off the stack, apply the operator, and push the result back on the stack
        } else if (token === '*' || token === '/' || token === '+' || token === '-') {
            // pop the last two numbers off the stack, apply the operator, and push the result back on the stack

        } else {
            // if token is a number, push it to the stack
            try {
                let value = token.parseFloat();
                operands.push(value);
            } catch (e) {
                console.log('Invalid input');
            }
        }

        // check if token is a number
        if (token) {

        }
        // if token is an operator, pop the last two numbers off the stack, apply the operator, and push the result back on the stack

    });
}

function evaluateInfix(list) {
    // Given an list of tokens in infix, evaluate the expression for a
    // 4 function calculator with parentheses.
    // Example: 1 + 2 * 3 -> 7      # Comment suggested by Copilot
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

    // ensure that stack has 1 element, or throw an error
    if (stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return stack.pop();
}
