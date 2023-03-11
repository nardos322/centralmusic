import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'centralmusic',
})

app.use(express.json());
app.get('/products/guitar-electric', async (req, res) => {
//     const data =  await pool.query(`
//     SELECT product.id, price, product.name, description, stock, name_subcategory, name_category,
// marca.name as marca, model, line, body_finish, material_body, hand, color, material_fretboard
// FROM product
// INNER JOIN subcategory ON product.subcategory_id = subcategory.id
// INNER JOIN category ON subcategory.category_id = category.id
// INNER JOIN marca ON product.marca_id = marca.id
// INNER JOIN guitar_electric_details ON guitar_electric_details.product_id = product.id`);
const data = await pool.query(`SELECT * FROM product
INNER JOIN subcategory ON product.subcategory_id = subcategory.id
INNER JOIN category ON category.id = subcategory.category_id
INNER JOIN marca ON product.marca_id = marca.id`)

return res.json(data[0])
})

app.get('/', (req, res) => {
    res.send('API central Music');
});


app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});