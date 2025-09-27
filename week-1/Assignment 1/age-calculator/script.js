// Minimal, robust calculation using Moment.js
document.getElementById('calc').addEventListener('click', () => {
  const input = document.getElementById('birthdate').value;
  const resultEl = document.getElementById('result');
  console.clear();
  console.log('Clicked calculate. input=', input);

  if (!input) {
    resultEl.innerText = 'Please select a date.';
    return;
  }

  const dob = moment(input, 'YYYY-MM-DD');
  if (!dob.isValid()) {
    resultEl.innerText = 'Invalid date.';
    console.error('Invalid date:', input);
    return;
  }

  const now = moment();
  if (dob.isAfter(now)) {
    resultEl.innerText = 'Birthdate cannot be in the future.';
    return;
  }

  const years = now.diff(dob, 'years');
  const afterYears = dob.clone().add(years, 'years');

  const months = now.diff(afterYears, 'months');
  const afterMonths = afterYears.clone().add(months, 'months');

  const days = now.diff(afterMonths, 'days');

  resultEl.innerText = `You are ${years} years, ${months} months, and ${days} days old.`;
  console.log({ years, months, days, afterYears: afterYears.format(), afterMonths: afterMonths.format() });
});

document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('birthdate').value = '';
  document.getElementById('result').innerText = '';
  console.clear();
});
