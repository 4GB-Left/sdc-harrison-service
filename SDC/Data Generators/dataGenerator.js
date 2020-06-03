const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();


fs.readFile('../db/data.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    let results = JSON.parse(data);
    let copy = JSON.parse(data);
    for (var i = 1; i < 100000; i++) {
      results.push(...copy);
    }
    console.log(results.length);
    let shoes = results;
    // let shoeCollection = [];
    // let colorCollection = [];
    let imgCollection = [];
    // let inventoryCollection = [];
    shoes.forEach((shoe, shoeInd) => {
      // shoe.product_id = shoeInd;
      // shoe.product_name = shoe.name
      // shoe.adidas_id = shoe.id;
      shoe.colors.forEach((color, colorInd)=>{
        // color.product_id = shoeInd;
        // color.inventory.forEach((row) => {
        //   row.color_id = colorInd;
        //   row.product_id = shoeInd;
        //   inventoryCollection.push(row);
        // })
        color.images.forEach((pic) => {
          let img = {
            color_id: colorInd,
            product_id: shoeInd,
            photo_url: pic
          }

          imgCollection.push(img);
        })
        // colorCollection.push(color);
      })
      // shoeCollection.push(shoe);
    });
    // shoeCollection.map((row) => {
    //   delete row.id;
    //   delete row.name;
    //   delete row.colors;
    // })
    // colorCollection.map((row) => {
    //   delete row.id;
    //   delete row.inventory;
    //   delete row.images;
    // });
    // console.log('shoeCollection', shoeCollection.length);
    // console.log('colorCollection', colorCollection.length);
    console.log('imgCollection', imgCollection.length);
    // console.log('inventoryCollection', inventoryCollection.length);
    console.log('prost!');

    // const writeAllShoes = (writer, encoding, callback) => {
    //   let i = 0;
    //   const write = () => {
    //     let ok = true;
    //     do {
    //       let shoe = shoeCollection[i];
    //       let row = `${shoe.product_id},${shoe.adidas_id},${shoe.product_name},${shoe.collection_name}, ${shoe.review_count},${shoe.review_average}\n`;
    //       if (i === shoeCollection.length -1) {
    //         writer.write(row, encoding, callback);
    //       } else {
    //         // see if we should continue, or wait
    //         // don't pass the callback, because we're not done yet.
    //         ok = writer.write(row, encoding);
    //       }
    //       i++;
    //     } while (i <shoeCollection.length -1 && ok);
    //     if (i < shoeCollection.length -1) {
    //       // had to stop early!
    //       // write some more once it drains
    //       writer.once('drain', write);
    //     }
    //   }
    // write()
    // }
    // let shoeWriter = fs.createWriteStream('shoes.csv');
    // shoeWriter.write('product_id,adidas_id,product_name,collection_name,review_count,review_average\n', 'utf8');
    // writeAllShoes(shoeWriter, 'utf-8', () => {
    //   writer.end();
    // });

    // let colorWriter = fs.createWriteStream('colors.csv');
    // colorWriter.write('product_id,color_name,color_url,list_price,sale_price\n')
    // const writeAllcolors = (writer, encoding, callback) => {
    //   let i = 0;
    //   const write = () => {
    //     let ok = true;
    //     do {
    //       let color = colorCollection[i];
    //       let row = `${color.product_id},${color.name},${color.url},${color.list_price}, ${color.sale_price}\n`;
    //       if (i === colorCollection.length -1) {
    //         writer.write(row, encoding, callback);
    //       } else {
    //         // see if we should continue, or wait
    //         // don't pass the callback, because we're not done yet.
    //         ok = writer.write(row, encoding);
    //       }
    //       i++;
    //     } while (i <colorCollection.length -1 && ok);
    //     if (i < colorCollection.length -1) {
    //       // had to stop early!
    //       // write some more once it drains
    //       writer.once('drain', write);
    //     }
    //   }
    //   write()
    // }
    // writeAllcolors(colorWriter, 'utf-8', () => {
    //   writer.end();
    // });


    // let imgWriter = fs.createWriteStream('images.csv');
    // imgWriter.write('product_id,color_id,photo_url\n');
    // const writeAllimgs = (writer, encoding, callback) => {
    //   let i = 0;
    //   const write = () => {
    //     let ok = true;
    //     do {
    //       const img = JSON.parse(imgCollection[i]);
    //       const row = `${img.product_id},${img.color_id},${img.photo_url}\n`;
    //       if (i === imgCollection.length -1) {
    //         writer.write(row, encoding, callback);
    //       } else {
    //         // see if we should continue, or wait
    //         // don't pass the callback, because we're not done yet.
    //         ok = writer.write(row, encoding);
    //       }
    //       i++;
    //     } while (i <imgCollection.length -1 && ok);
    //     if (i < imgCollection.length -1) {
    //       // had to stop early!
    //       // write some more once it drains
    //       writer.once('drain', write);
    //     }
    //   }
    //   write()
    // }
    // writeAllimgs(imgWriter, 'utf-8', () => {
    //   writer.end();
    // });

    // let inventoryWriter = fs.createWriteStream('inventory.csv');
    // inventoryWriter.write('product_id,color_id,size,quantity\n');
    // const writeAllInventory = (writer, encoding, callback) => {
    //   let i = 0;
    //   const write = () => {
    //     let ok = true;
    //     do {
    //       let inv = inventoryCollection[i];
    //       const row = `${inv.product_id},${inv.color_id},${inv.size},${inv.quantity}\n`;
    //       if (i === inventoryCollection.length -1) {
    //         writer.write(row, encoding, callback);
    //       } else {
    //         // see if we should continue, or wait
    //         // don't pass the callback, because we're not done yet.
    //         ok = writer.write(row, encoding);
    //       }
    //       i++;
    //     } while (i <inventoryCollection.length -1 && ok);
    //     if (i < inventoryCollection.length -1) {
    //       // had to stop early!
    //       // write some more once it drains
    //       writer.once('drain', write);
    //     }
    //   }
    // write()
    // }
    // writeAllInventory(inventoryWriter, 'utf-8', () => {
    //   writer.end();
    // });

  }
});


/* POSTGRESQL */
// create shoe record
// create color records with shoe_id
// create inventory records with color and product id
// create photo records with color and product id

/* CASSANDRA */
// create
