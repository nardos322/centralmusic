-- Active: 1678907771429@@127.0.0.1@3306@centralmusic

SELECT id, price, name, description, stock, subcategory.subcategory, 
category.category, marca.marca 
FROM product
INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
INNER JOIN category ON category.idCategory = subcategory.idCategory
INNER JOIN marca ON product.idMarca = marca.idMarca
WHERE subcategory = 'amplificador para guitarra';


SELECT subcategory, category.category FROM subcategory
INNER JOIN category ON subcategory.idCategory= category.idCategory
WHERE category = 'efectos';

SELECT * FROM subcategory;

SELECT * FROM category;

INSERT INTO category VALUES
(DEFAULT, 'amplificadores');

INSERT INTO subcategory VALUES
(DEFAULT, 'amplificador multifuncion', 3);

SELECT * FROM product;

SELECT * from marca;

INSERT INTO product VALUES
(DEFAULT, 10000, 'fender telecaster', 'telecaster año 60', 10, 1, 1);

SELECT product.id, price, name, description, stock, subcategory.subcategory, 
category.category, marca.marca, guitar_details.*
FROM product
INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
INNER JOIN category ON category.idCategory = subcategory.idCategory
INNER JOIN marca ON product.idMarca = marca.idMarca
INNER JOIN guitar_details ON product.id = guitar_details.product_id
WHERE product.id = 1;

SELECT * FROM product
INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
INNER JOIN category ON category.idCategory = subcategory.idCategory
INNER JOIN marca ON product.idMarca = marca.idMarca
WHERE category = 'guitarras';

SELECT * FROM subcategory
INNER JOIN category ON subcategory.idCategory = category.idCategory
WHERE category = 'guitarras'


INSERT INTO product (price, name, description, stock, `idSubcategory`, `idMarca`)
VALUES ('500', 'guitarra fender mexicana', 'guitarra premuim original', 30, 1, 1 )


INSERT INTO product (price, name, description, stock, `idSubcategory`, `idMarca`)
VALUES ('3500', 'amplificador fender twin reverb', 'amplificador valvular 100 watts', 5, 4, 1 )