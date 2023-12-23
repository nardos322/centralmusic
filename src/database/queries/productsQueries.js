import { pool } from '../dbConnection.js';


export const productsQueries = {
     AllProducts: async () => {
        try {
            let allProducts = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
                category.category, marca.marca 
                FROM product
                INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
                INNER JOIN category ON category.idCategory = subcategory.idCategory
                INNER JOIN marca ON product.idMarca = marca.idMarca`);
    
        
            return allProducts
    
        }catch(err){
            console.log(err)
        }
    },
    
    oneProduct: async (id) => {
    
        try {
            let product = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
                category.category, marca.marca 
                FROM product
                INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
                INNER JOIN category ON category.idCategory = subcategory.idCategory
                INNER JOIN marca ON product.idMarca = marca.idMarca
                WHERE id = ${id}`)
    
            return product
        }catch(err){
            console.log(err)
        }
    },
    
    detailsProduct: async(id, details) => {
        try {
            let detailsQuery = await pool.query(`SELECT product.id, price, name, description, stock, subcategory.subcategory, 
                category.category, marca.marca, ${details}.*
                FROM product
                INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
                INNER JOIN category ON category.idCategory = subcategory.idCategory
                INNER JOIN marca ON product.idMarca = marca.idMarca
                INNER JOIN ${details} ON product.id = ${details}.product_id
                WHERE product.id = ${id}`)
    
            return detailsQuery
        }catch(err){
            console.log(err)
        }
       
    }

}


