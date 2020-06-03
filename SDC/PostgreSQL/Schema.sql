DROP DATABASE IF EXISTS adidas;
CREATE DATABASE adidas;
\c adidas;

-- CREATE TABLE products(
--   product_id           SERIAL               NOT NULL,
--   adidas_id            VARCHAR(16)          NOT NULL,
--   product_name         VARCHAR(64)          NOT NULL,
--   collection_name      VARCHAR(255)         NOT NULL,
--   review_count         INT                  NOT NULL,
--   review_average       DECIMAL(18,2)        NOT NULL,
--   PRIMARY KEY(product_id)
-- );
-- \COPY products (adidas_id, product_name, collection_name, review_count, review_average) FROM '../Data/bigShoes.csv' CSV HEADER DELIMITER ',';

-- CREATE TABLE colors(
--   color_id     SERIAL                      NOT NULL,
--   product_id   INT                         NOT NULL,
--   color_name   VARCHAR(1000)               NOT NULL,
--   color_url    VARCHAR(100)                NOT NULL,
--   list_price   DECIMAL(18,2)               NOT NULL,
--   sale_price   DECIMAL(18,2)               NOT NULL,
--   PRIMARY KEY(color_id)
-- );
-- \COPY colors (product_id, color_name, color_url, list_price, sale_price) FROM '../Data/bigColors.csv' CSV HEADER DELIMITER ',';

CREATE TABLE photos(
  photo_id          SERIAL                  NOT NULL,
  product_id        INT                     NOT NULL,
  color_id          INT                     NOT NULL,
  photo_url         VARCHAR(30)             NOT NULL,
  PRIMARY KEY(photo_id)
);
\COPY photos (product_id, color_id, photo_url) FROM '../Data/bigPhotos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE inventory(
  inventory_id      SERIAL                    NOT NULL,
  product_id        INT                       NOT NULL,
  color_id          INT                       NOT NULL,
  size              VARCHAR(30)               NOT NULL,
  quantity          INT                       NOT NULL,
  PRIMARY KEY(inventory_id)
);
\COPY inventory (product_id, color_id, size, quantity) FROM '../Data/bigInventory.csv' DELIMITER ',' CSV HEADER;