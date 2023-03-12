-- Active: 1678539129192@@127.0.0.1@3306@centralmusic

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
(DEFAULT, 5000, 'guitarra del chaqueño', 'guitarra hecha en chaco', 1, 3, 3);


