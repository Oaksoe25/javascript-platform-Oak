// date.js
function getCurrentDate() {
    return new Date().toDateString();
  }
  
  function getCurrentTime() {
    return new Date().toLocaleTimeString();
  }
  
  module.exports = { getCurrentDate, getCurrentTime };
  