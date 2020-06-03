BEGIN
\set product_id random(1, 99999)
\set randQ random(1, 2894723)
UPDATE inventory
SET quantity = :randQ
WHERE product_id = :product_id;
END;