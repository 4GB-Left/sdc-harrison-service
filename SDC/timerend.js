const fs = require('fs');
fs.appendFile('timer.txt',`end: ${Date.now()}`, ()=>{
  console.log('end', date.now())
});
