const fs = require('fs');
const data = require('./data.js');

// console.log(data);
let results = Array.from(data);
let copy = data;
for (var x = 1; x < 50001; x++) {
  results.push(...copy);
}
console.log(results.length);

let inventoryStream = fs.createWriteStream('../Data/bigInventory.csv');
inventoryStream.write('product_id,color_id,size,quantity\n');

const writeAllphotos = (writer, encoding, callback) => {
      let i = 0;
      let colorKey = 0;
      const write = () => {
        let ok = true;
        do {
          let colors = results[i].colors;
          for (var j = 0; j<= colors.length - 1; j++) {
            colorKey++;
            let color = colors[j];
            for (var u = 0; u <= color.inventory.length - 1; u++) {
              let row = `${i+1},${colorKey},${color.inventory[u].size},${color.inventory[u].quantity}\n`;
              if (i === results.length -1) {
                writer.write(row, encoding, callback);
              } else {
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet.
                ok = writer.write(row, encoding);
              }
            }
          }
          i++;
        } while (i <results.length -1 && ok);
        if (i < results.length -1) {
          // had to stop early!
          // write some more once it drains
          writer.once('drain', write);
        }
      }
    write()
    }

    writeAllphotos(inventoryStream, 'utf-8', () => {
      inventoryStream.end();
    });