import { pool } from '../dbConnection.js';


export const categoriesQueries = {
    showCategories: async () => {
        try {
            let categories = [];
            let res =  await pool.query(`SELECT category FROM category`)
            res = res[0];

            for(let i in res){
                categories.push(res[i].category);
                
            }
            
            return categories;
        }catch(err){
            console.log(err);
        }
        
    },
    showSubcategories: async(category) => {
        try {   
            let subcategories = [];
            let res = await pool.query(`SELECT subcategory FROM subcategory
            INNER JOIN category ON subcategory.idCategory= category.idCategory
            WHERE category = '${category}'`);
            res = res[0];

            for (const i in res ) {
                subcategories.push(res[i].subcategory);
            }

            return subcategories;
        }catch(err){
            console.log(err);
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
            res = res[0]
            
            return res;

        }catch(err){
            console.log(err)
        }
    }
}