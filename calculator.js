
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