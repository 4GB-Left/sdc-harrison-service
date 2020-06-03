const {Client} = require('pg');
const config = require('./db.config.js');

const client = new Client(config);
client.connect();

module.exports = {
  //returns all info about a product, formatted as JSON
  getProduct: (product_id, callback) => {
    let sql = `SELECT *, (SELECT array_agg(photo_url) FROM photos WHERE product_id=products.product_id AND color_id=colors.color_id) AS photos,
    (SELECT array_agg(inventory_id) FROM inventory WHERE product_id=products.product_id AND color_id=colors.color_id) AS inventory_ids,(SELECT array_agg(size) FROM inventory WHERE product_id=products.product_id AND color_id=colors.color_id) AS sizes, (SELECT array_agg(quantity) FROM inventory WHERE products.product_id=product_id AND color_id=colors.color_id) AS quantities FROM products INNER JOIN colors ON colors.product_id = products.product_id WHERE products.product_id=${product_id}`;
    client.query(sql, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result)
      }
    })
  },

  preparedQuery: (product_id, callback) => {
    let sql = `SELECT *, (SELECT array_agg(photo_url) FROM photos WHERE product_id=products.product_id AND color_id=colors.color_id) AS photos,
    (SELECT array_agg(inventory_id) FROM inventory WHERE product_id=products.product_id AND color_id=colors.color_id) AS inventory_ids,(SELECT array_agg(size) FROM inventory WHERE product_id=products.product_id AND color_id=colors.color_id) AS sizes, (SELECT array_agg(quantity) FROM inventory WHERE products.product_id=product_id AND color_id=colors.color_id) AS quantities FROM products INNER JOIN colors ON colors.product_id = products.product_id WHERE products.product_id=${product_id}`;
    client.query(sql, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result)
      }
    })
  },

};