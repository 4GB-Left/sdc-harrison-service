const fs = require('fs');
const data = require('./data.js');

// console.log(data);
let results = Array.from(data);
let copy = data;
for (var x = 1; x < 50001; x++) {
  results.push(...copy);
}
console.log(results.length);

let shoeStream = fs.createWriteStream('../Data/CassandraShoes.csv', {flags:'a', encoding:'utf-8'});
shoeStream.write('product_id,adidas_id,product_name,collection_name,review_count,review_average\n')

const writeAllShoes = (writer, encoding, callback) => {
      let i = 0;
      const write = () => {
        let ok = true;
        do {
          let shoe = results[i];
          let row = `${i+1},${shoe.id},${shoe.name},${shoe.collection_name}, ${shoe.review_count},${shoe.review_average}\n`;
          if (i === results.length -1) {
            writer.write(row, encoding, callback);
          } else {
            // see if we should continue, or wait
            // don't pass the callback, because we're not done yet.
            ok = writer.write(row, encoding);
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

    writeAllShoes(shoeStream, 'utf-8', () => {
      shoeStream.end();
    });