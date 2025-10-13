// app.js
const math = require('./math');
const string = require('./string');
const date = require('./date');
const logger = require('./logger');

logger.logInfo('Application started');

// Use math module
console.log("Add: ", math.add(10, 5));
console.log("Subtract: ", math.subtract(10, 5));

// Use string module
console.log("Capitalize: ", string.capitalize('hello world'));
console.log("Reverse: ", string.reverse('Node.js'));

// Use date module
console.log("Current Date: ", date.getCurrentDate());
console.log("Current Time: ", date.getCurrentTime());

logger.logInfo('Application finished successfully');
