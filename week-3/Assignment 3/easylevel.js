// Print Numbers 1 to 10
for (let i =1; i <= 10; i++) {
    console.log(i);
}

// Even or Odd Checker
let number = parseInt(prompt("Enter a number:"));

if (number % 2 === 0) {
  console.log(number + " is Even");
} else {
  console.log(number + " is Odd");
}

// Simple Calculator (Addition)
let num1 = parseFloat(prompt("Enter first number:"));
let num2 = parseFloat(prompt("Enter second number:"));

let sum = num1 + num2;
console.log("The sum is: " + sum);

