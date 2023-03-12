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
app.get('/products/:category/:subcategory?', async (req, res) => {

    let rowCategory = req.params.category;
    let category = rowCategory.replaceAll('-', ' ');
    let rowSubcategory = req.params.subcategory;
    let subcategory
    if(rowSubcategory){
        subcategory = rowSubcategory.replaceAll('-', ' ');
    }
    
   
    let queryCategories = await pool.query(`SELECT category FROM category`);
    let querySubcategories = await pool.query(`SELECT subcategory FROM subcategory
    INNER JOIN category ON subcategory.idCategory= category.idCategory
    WHERE category = '${category}'`);
    let subcategories = querySubcategories[0];
   
    let i = 0;

    while(i < queryCategories[0].length){
        
        if(queryCategories[0][i].category == category && (subcategories[i].subcategory == subcategory || subcategory)){
            console.log(subcategories[i])
            let result = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
            category.category, marca.marca 
            FROM product
            INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
            INNER JOIN category ON category.idCategory = subcategory.idCategory
            INNER JOIN marca ON product.idMarca = marca.idMarca
            WHERE subcategory = '${subcategory}'`)
            
            return result[0].length == 0 ? res.json({msg: 'no se encontraron productos o la ruta es erronea'}) : res.json(result[0]);
        }else if(queryCategories[0][i].category == category && !subcategory){
            return res.json(subcategories)
        }else if(queryCategories[0][i].category == category && !(subcategories[i].subcategory == subcategory)){
            return res.json({msg: 'no se encontraron productos'})
        }
        
        
        i++;
    }
    
    
    return res.send('categoria no encontrada');
    


    
})

app.get('/', (req, res) => {
    res.send('API central Music');
});




app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});