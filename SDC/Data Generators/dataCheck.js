const fs = require('fs');

fs.readFile('../db/data.json', 'utf8', (err, data) => {
  if (err) throw err;
  let info = {};
  info.productRows = 0;
  info.avgNumColors = [];
  info.avgNumPhotos = [];
  info.totalPhotoCounts = [];
  info.avgNumInventory = [];
  data = JSON.parse(data);
  let curColorMin = Infinity;
  let curColorMax = -Infinity;
  let curPhotoMax = -Infinity;
  let curPhotoMin = Infinity;
  let curInventoryMin = Infinity;
  let curInventoryMax = -Infinity;
  let colorCount = 0;
  let inventoryCount = 0;
  data.forEach((shoe) => {
    if (curColorMin >= shoe.colors.length) {
      curColorMin = shoe.colors.length;
    } else if (curColorMax <= shoe.colors.length) {
      curColorMax = shoe.colors.length;
    }
    info.productRows++;
    info.avgNumColors.push(shoe.colors.length);
    let totalPictureCount = 0;
    shoe.colors.forEach((color) => {
      colorCount++;
      info.avgNumPhotos.push(color.images.length);
      totalPictureCount += color.images.length;
      info.avgNumInventory.push(color.inventory.length);
      inventoryCount += color.inventory.length;
      if (curInventoryMin >= color.inventory.length) {
        curInventoryMin = color.inventory.length;
      } else if (curInventoryMax <= color.inventory.length) {
        curInventoryMax = color.inventory.length;
      }
    })
    if (curPhotoMin >= totalPictureCount) {
      curPhotoMin = totalPictureCount;
    } else if (curPhotoMax <= totalPictureCount) {
      curPhotoMax = totalPictureCount;
    }
    info.totalPhotoCounts.push(totalPictureCount);
  })
  info.avgNumColors = info.avgNumColors.reduce((acc, curr) => {return acc += curr})/info.productRows;
  info.colorDetails = `min: ${curColorMin} || max: ${curColorMax} || total: ${colorCount}`;
  info.avgNumPhotos = info.avgNumPhotos.reduce((acc, curr) => {return acc += curr})/info.productRows;
  let photoTotal = info.totalPhotoCounts.reduce((acc, curr) => acc += curr);
  delete info.totalPhotoCounts;
  info.photoDetails = `min: ${curPhotoMin} || max: ${curPhotoMax} || total: ${photoTotal}`;
  info.avgNumInventory = (info.avgNumInventory.reduce((acc, curr) => {return acc += curr})/info.productRows)/info.avgNumColors;
  info.inventoryDetails = `min: ${curInventoryMin} || max: ${curInventoryMax} || total: ${inventoryCount}`;
  console.log(info);
  return info;
});

