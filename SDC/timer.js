const fs = require('fs');
fs.writeFile('timer.txt',`Start: ${Date.now()}`,() => {
  console.log('start');
});
