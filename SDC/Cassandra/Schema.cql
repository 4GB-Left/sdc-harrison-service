CREATE KEYSPACE adidas
  WITH REPLICATION = {
   'class' : 'NetworkTopologyStrategy',
   'datacenter1' : 3
  };

USE adidas;

CREATE TABLE products(
  product_id int,
  adidas_id text,
  product_name text,
  collection_name text,
  product_review_count int,
  product_review_avg decimal,
  PRIMARY KEY (product_id)
);

COPY products (product_id, adidas_id, product_name, collection_name, product_review_count, product_review_avg) FROM '../Data/CassandraShoes.csv' WITH HEADER = TRUE;

CREATE TABLE colors (
  product_id int,
  color_id int,
  color_name text,
  color_url text,
  color_list_price decimal,
  color_sale_price decimal,
  photos set<text>,
  PRIMARY KEY (product_id,color_id)
);

COPY colors (product_id, color_id, color_name, color_url, color_list_price, color_sale_price, photos) FROM '../Data/CassandraColors.csv' WITH HEADER = TRUE AND DELIMITER = '|';

CREATE TABLE inventory (
  product_id int,
  color_id int,
  size text,
  quantity int,
  PRIMARY KEY (product_id,color_id,size)
);

COPY inventory (product_id, color_id, size, quantity) FROM '../Data/bigInventory.csv' WITH HEADER = TRUE;

--  set of thumbnails for other colors, and default color for product -- product