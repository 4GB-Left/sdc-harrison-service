require('newrelic');
const express = require('express');
const app = express();
const port = 4500;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cassandra = require('../Cassandra/db');
const compression = require('compression');
let path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression());

app.get('/api/product/:product_id', async (req, res) => {
  await cassandra.getAProduct(req.params.product_id, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
    res.end();
  })
})

app.get('/api/products/:product_id', async (req, res) => {
  await cassandra.getAProduct(req.params.product_id, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
    res.end();
  })
}),
app.get('/api/products/:product_id/colors/', (req, res) => {
  cassandra.getColors(req.params.product_id, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
    res.end();
  })
})
app.get('/api/products/:product_id/colors/:color_id/inventory', (req, res) => {
  cassandra.getInventory(req.params.product_id, req.params.color_id, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
    res.end();
  })
})


app.patch('/api/products/', (req, res) => {
  const options = {
    quantity: req.query.quantity,
    product_id: req.query.product_id,
    color_id: req.query.color_id,
    size: req.query.size
  }
  cassandra.updateInventoryQuantity(options, (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(202).send(result);
    }
  })
})

app.use(express.static(path.join(__dirname, '/../../adidas-product/client/dist/')));
app.listen(port, () => {
  console.log('listening on port: ', port);
})
// app.listen(4501, () => {
//   console.log('listening on port: ', 4501);
// })
// app.listen(4502, () => {
//   console.log('listening on port: ', 4502);
// })
// app.listen(4503, () => {
//   console.log('listening on port: ', 4503);
// })
// app.listen(4504, () => {
//   console.log('listening on port: ', 4504);
// })


/* OLD POSTGRES QUERY

postgres.getProduct(req.query.product_id, (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      // console.log(result.rows);
      let results = result.rows;
      if (results.length > 0) {
        let shoe = {
          product_id: results[0].product_id,
          id: results[0].adidas_id,
          name: results[0].product_name,
          collection_name: results[0].collection_name,
          review_count: results[0].review_count,
          review_average: results[0].review_average,
          colors:[]
        }
        for (var x = 0; x <= results.length - 1; x++) {
          let aColor = results[x];
          let color = {
            id: aColor.color_id,
            url: aColor.color_url,
            name: aColor.color_name,
            list_price: aColor.list_price,
            sale_price: aColor.sale_price,
            inventory: [],
            photos: aColor.photos
          }
          let inv = _.zip(results[x].inventory_ids, results[x].sizes, results[x].quantities);
          inv = inv.map((el) => {
            return {id: el[0], size: el[1], quantity: el[2]};
          })
          color.inventory.push(...inv);
          shoe.colors.push(color);
        }
        res.status(200).send(shoe);
      } else {
        res.status(200);
      }
    }
    res.end();
  })

*/