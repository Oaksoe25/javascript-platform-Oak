// Swap the Values
let x = 10;
let y = 20;

let temp = x;
x = y;
y = temp;
console.log("x = ", x);
console.log("y = ",y);

// Simple Math with Variables
let a = 8;
let b = 3;
let sum = a + b;
let product = a * b;
let average = (a + b)/ 2;
console.log("Sum:",sum);
console.log("Product:",product);
console.log("Average:",average);

// Temperature Conversion
let C = 25;
let R = 4/5 * C;
let F = 9/5 * C + 32;
let K = C + 273.15;
console.log("Reaumur:",R);
console.log("Fahrenheit:",F);
console.log("Kelvin:",K);

// Predict the Value
let A = 5;
let B = 2;
let result = A + B * A;
console.log("Result:",result)
// Answer is 15 due to PEMDAS calculation.

// Combine string
let firstName ="Oak Soe";
let lastName = " Zaw";
let fullName = firstName + lastName
console.log(fullName);

// Guess the Output
let X = 10;
let Y = X;
X = 20;
console.log(Y);
// Because y copies the value of x at that moment (not a reference).
//  Changing x later does not affect y.