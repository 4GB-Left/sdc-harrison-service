require('newrelic');
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'adidas'
})

client.connect();

module.exports = {
  getColors: (product_id, callback) =>{
    const prodParams = [product_id];
    const colorQuery = 'SELECT * FROM colors WHERE product_id = ?';
    client.execute(colorQuery, prodParams, {prepare:true})
      .then((result) => {
        callback(null, result.rows);
      })
      .catch((err) => {
        callback(err);
      })
  },
  getAProduct: (product_id, callback) => {
    const productQuery = 'SELECT * FROM products WHERE product_id = ?';
    const prodParams = [product_id];
    client.execute(productQuery, prodParams, {prepare:true})
      .then((result) => {
        callback(null, result.rows)
      })
      .catch((err) => {
        callback(err);
      })
  },
  getInventory: (product_id, color_id, callback) => {
    const inventoryQuery = 'SELECT * FROM inventory WHERE product_id = ? AND color_id = ?'
    const prodParams = [product_id, color_id];
    client.execute(inventoryQuery, prodParams, {prepare:true})
      .then((result) => {
        callback(null, result.rows)
      })
      .catch((err) => {
        callback(err);
      })
  },

  getProduct: async (product_id, callback) => {
    const productQuery = 'SELECT * FROM products WHERE product_id = ?';
    const prodParams = [product_id];
    const colorQuery = 'SELECT * FROM colors WHERE product_id = ?';
    const inventoryQuery = 'SELECT * FROM inventory WHERE product_id = ? AND color_id = ?'
    let Shoes = await client.execute(productQuery, prodParams, {prepare: true})
    if (Shoes.rows[0]) {
      const product = Shoes.rows[0];
      let Shoe = {
        product_id: product.product_id,
        id: product.adidas_id,
        name: product.product_name,
        collection_name: product.collection_name,
        review_count: product.product_review_count,
        review_average: product.product_review_avg,
        colors: []
      }
      client.execute(colorQuery, prodParams, {prepare: true})
        .then(async (result) => {
          const colors = result.rows;
          for (var x = 0; x <= colors.length - 1; x++) {
            let color = {
              id: colors[x].color_id,
              url: colors[x].color_url,
              name: colors[x].color_name,
              list_price: colors[x].color_list_price,
              sale_price: colors[x].color_sale_price
            }
            let colorParams = [prodParams[0]];
            colorParams.push(colors[x].color_id);
            let Inventories = await client.execute(inventoryQuery,  colorParams, {prepare: true})
            color.inventory = Inventories.rows;
            Shoe.colors.push(color);
          }
          callback(null, Shoe);
        })
        .catch((err) => {
          callback(err);
        })
    } else {
      console.log('no shoe with that id')
      callback(null);
    }
  },

  // getProduct: (product_id, callback) => {

  // },

  updateInventoryQuantity: (opts, callback) => {
    const updateQuery = 'UPDATE inventory SET quantity = ? WHERE product_id = ? AND color_id = ? AND size = ?';
    const updateParams = [opts.quantity, opts.product_id, opts.color_id, opts.size];
    client.execute(updateQuery, updateParams, {prepare: true})
      .then((result) => {
        console.log('successful inventory update');
        callback(null, result);
      })
      .catch((err) => {
        console.log('error updating inventory', err);
        callback(err);
      })
  },

  updateProductReview: (opts, callback) => {
    const updateQuery = 'UPDATE products SET product_review_count = ?, product_review_avg = ? WHERE product_id = ?';
    const updateParams = [opts.review_count, review_avg, product_id];
    client.execute(updateQuery, updateParams, {prepare: true})
      .then((result) => {
        console.log('successful product update');
        callback(null, result);
      })
      .catch((err) => {
        console.log('error updating product', err);
        callback(err);
      })
  }
};
