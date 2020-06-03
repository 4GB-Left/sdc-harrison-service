const fs = require('fs');
const data = require('./data.js');

// console.log(data);
let results = Array.from(data);
let copy = data;
for (var x = 1; x < 50001; x++) {
  results.push(...copy);
}
console.log(results.length);

let colorStream = fs.createWriteStream('../Data/CassandraColors.csv');
colorStream.write('product_id|color_id|color_name|color_url|list_price|sale_price|photos\n');

//--max-old-space-size=4096

const writeAllColors = (writer, encoding, callback) => {
      let i = 0;
      let colorId = 0;
      const write = () => {
        let ok = true;
        do {
          let colors = results[i].colors;
          for (var j = 0; j<= colors.length - 1; j++) {
            colorId++;
            let color = colors[j];
            let row = `${i+1}|${colorId}|${color.name}|${color.url}| ${color.list_price}|${color.sale_price}|[${color.images}]\n`;
            if (i === results.length -1) {
              writer.write(row, encoding, callback);
            } else {
              // see if we should continue, or wait
              // don't pass the callback, because we're not done yet.
              ok = writer.write(row, encoding);
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

    writeAllColors(colorStream, 'utf-8', () => {
      colorStream.end();
    });