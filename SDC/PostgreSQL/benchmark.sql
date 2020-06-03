BEGIN
\set product_id random(1, 99999)
\set offset 5 * random(1, 10)
SELECT
  *,
  (SELECT array_agg(photo_url)
    FROM photos
    WHERE product_id=products.product_id AND color_id=colors.color_id)
    AS photos,
  (SELECT array_agg(size)
    FROM inventory
    WHERE product_id=products.product_id AND color_id=colors.color_id)
    AS sizes,
  (SELECT array_agg(quantity)
    FROM inventory
    WHERE products.product_id=product_id AND color_id=colors.color_id)
    AS quantities
FROM products
INNER JOIN colors
ON colors.product_id = products.product_id
WHERE products.product_id= :product_id;
END;