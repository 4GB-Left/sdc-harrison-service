##### Run node with more memory
node --max-old-space-size=4096 yourFile.js

#### DROP All your Tables
DROP TABLE products CASCADE;
DROP TABLE colors CASCADE;
DROP TABLE photos CASCADE;
DROP TABLE inventory CASCADE;

#### ADD Index to PSQL table
CREATE INDEX idx_name ON table_name USING method(col_name);

CREATE INDEX colors_product ON colors USING btree(product_id);
CREATE INDEX photos_product ON photos USING btree(product_id);
CREATE INDEX inventory_product ON inventory USING btree(product_id);

method defaults to 'btree'

#### GET stats from PSQL Queries
EXPLAIN (analyze) sqlQuery