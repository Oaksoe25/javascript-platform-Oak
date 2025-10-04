// Grade Checker
let score = parseFloat(prompt("Enter your score:"));

if (score >= 85 ) {
  console.log("Grade: A");
} else if (score >= 70 ) {
  console.log("Grade: B");
} else if (score >= 50 ) {
  console.log("Grade: C");
} else {
  console.log("Grade: Fail");
}

// Multiplication Table Generator
let num = parseInt(prompt("Enter a number:"));

for (let i = 1; i <= 10; i++) {
  console.log(num + " × " + i + " = " + (num * i));
}

// Array of Fruits
let fruits = ["Apple", "Banana", "Papaya", "Orange", "Watermelon"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

