import { pool } from '../dbConnection.js';


export const categoriesQueries = {
    showCategories: async () => {
        try {
            let categories =  await pool.query(`SELECT category FROM category`)

            return categories
        }catch(err){
            console.log(err)
        }
        
    },
    showSubcategories: async(category) => {
        try {   
            let subcategories = await pool.query(`SELECT subcategory FROM subcategory
            INNER JOIN category ON subcategory.idCategory= category.idCategory
            WHERE category = '${category}'`);

            return subcategories
        }catch(err){
            console.log(err)
        }
    },
    showProductsForSubcategory: async(subcategory) => {
        try {
            let res = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
                category.category, marca.marca 
                FROM product
                INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
                INNER JOIN category ON category.idCategory = subcategory.idCategory
                INNER JOIN marca ON product.idMarca = marca.idMarca
                WHERE subcategory = '${subcategory}'`)

            return res    
        }catch(err){
            console.log(err)
        }
    },
    showProductsForCategory: async(category) => {
        try{
            let res = await pool.query(`SELECT id, price, name, description, stock, subcategory.subcategory, 
                category.category, marca.marca 
                FROM product
                INNER JOIN subcategory ON product.idSubcategory = subcategory.idSubcategory
                INNER JOIN category ON category.idCategory = subcategory.idCategory
                INNER JOIN marca ON product.idMarca = marca.idMarca
                WHERE category = '${category}'`);
            return res;

        }catch(err){
            console.log(err)
        }
    }
}