// Find the Largest Number
let numbers = [12, 5, 20, 25, 7];
let largest = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > largest) {
    largest = numbers[i];
  }
}

console.log("Largest number is: " + largest);

// Reverse a String
let word = prompt("Enter a word:");
let reversed = "";

for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}

console.log("Reversed: " + reversed);

// Prime Number Checker
let n = parseInt(prompt("Enter a number:"));
let isPrime = true;

if (n <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) {
  console.log(n + " is Prime");
} else {
  console.log(n + " is Not Prime");
}

// Array Filtering (Adults Only)
let ages = [12, 18, 25, 30, 15];
let adults = [];

for (let i = 0; i < ages.length; i++) {
  if (ages[i] >= 18) {
    adults.push(ages[i]);
  }
}

console.log("Adults: " + adults);
