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


app.get('/products', async (req, res) => {
   
    let queryCategories = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
    category.category, marca.marca 
    FROM product
    INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
    INNER JOIN category ON category.idCategory = subcategory.idCategory
    INNER JOIN marca ON product.idMarca = marca.idMarca`);


    return res.json(queryCategories[0])
})



app.get('/categorias', async (req, res) => {
   

    let queryCategories = await pool.query('SELECT category FROM category')

    return res.json(queryCategories[0])
})


app.get('/categorias/:category', async (req, res) => {
   
    let category = req.params.category;
    category = category.replaceAll('-', ' ');

    let queryCategories = await pool.query(`SELECT category, subcategory FROM subcategory
    INNER JOIN category ON subcategory.idCategory = category.idCategory
    WHERE category = '${category}'`)

    return res.json(queryCategories[0])
})




app.get('/products/id/:id', async (req, res) => {
    let id = req.params.id;
    let query = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
    category.category, marca.marca 
    FROM product
    INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
    INNER JOIN category ON category.idCategory = subcategory.idCategory
    INNER JOIN marca ON product.idMarca = marca.idMarca
    WHERE id = ${id}`)

    return res.json(query[0][0])
})


app.get('/products/details/:details/id/:id', async (req, res) => {
    let id = req.params.id
    let details = req.params.details;
        details = details.replaceAll('-', '_');

    let tables = await pool.query('SHOW TABLES');
    tables = tables[0];

    let resultDetails = tables.findIndex(table => {
        return table['Tables_in_centralmusic'] == details
    })
    
   

    if(resultDetails == 1) {
        let detailsProduct = await pool.query(`SELECT product.id, price, name, description, stock, subcategory.subcategory, 
        category.category, marca.marca, ${details}.*
        FROM product
        INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
        INNER JOIN category ON category.idCategory = subcategory.idCategory
        INNER JOIN marca ON product.idMarca = marca.idMarca
        INNER JOIN ${details} ON product.id = ${details}.product_id
        WHERE product.id = ${id}`)
    
        return res.json(detailsProduct[0][0])
    }else{
        return res.status(404).json('detalles no encontrados')
    }

   
})


app.get('/products/:category/:subcategory?', async (req, res) => {

    let category = req.params.category;
    category = category.replaceAll('-', ' ');
    let subcategory = req.params.subcategory;
    
    if(subcategory){
        subcategory = subcategory.replaceAll('-', ' ');
    }
    
    let queryCategories = await pool.query(`SELECT category FROM category`);
    let querySubcategories = await pool.query(`SELECT subcategory FROM subcategory
    INNER JOIN category ON subcategory.idCategory= category.idCategory
    WHERE category = '${category}'`);
    let subcategories = querySubcategories[0];
   
    let i = 0;
    while(i < queryCategories[0].length){
        
        if(queryCategories[0][i].category == category &&  subcategory){
    
            let result = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
            category.category, marca.marca 
            FROM product
            INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
            INNER JOIN category ON category.idCategory = subcategory.idCategory
            INNER JOIN marca ON product.idMarca = marca.idMarca
            WHERE subcategory = '${subcategory}'`)
            
            return result[0].length == 0 ? res.json({msg: 'no se encontraron productos o la ruta es erronea'}) : res.json(result[0]);
        }else if(queryCategories[0][i].category == category && !subcategory){
            console.log('hola')
            let result = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
            category.category, marca.marca 
            FROM product
            INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
            INNER JOIN category ON category.idCategory = subcategory.idCategory
            INNER JOIN marca ON product.idMarca = marca.idMarca
            WHERE category = '${category}'`)
            return res.json(result[0])
        }else if(queryCategories[0][i].category == category && !(subcategories[i].subcategory == subcategory)){
           
            return res.json({msg: 'no se encontraron productos'})
        }
        
        
        i++;
    }
    
    
    return res.send('categoria no encontrada');
    


    
})

app.get('/products/:category/:subcategory/:details/id/:id', async (req, res) => {
    let id = req.params.id;
    let details = req.params.details;
    details = details.replaceAll('-', '_');
    let tables = await pool.query('SHOW TABLES');
    tables = tables[0];

    let resultDetails = tables.findIndex(table => {
        return table['Tables_in_centralmusic'] == details
    })
    
   

    if(resultDetails == 1) {
        let detailsProduct = await pool.query(`SELECT product.id, price, name, description, stock, subcategory.subcategory, 
        category.category, marca.marca, ${details}.*
        FROM product
        INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
        INNER JOIN category ON category.idCategory = subcategory.idCategory
        INNER JOIN marca ON product.idMarca = marca.idMarca
        INNER JOIN ${details} ON product.id = ${details}.product_id
        WHERE product.id = ${id}`)
    
        return res.json(detailsProduct[0][0])
    }else{
        return res.status(404).json('detalles no encontrados')
    }
})


app.get('/', (req, res) => {
    res.send('API central Music');
});




app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});