import { productsQueries } from '../database/queries/productsQueries.js';
import { categoriesQueries } from '../database/queries/categoriesQueries.js';
import { pool } from '../database/dbConnection.js';

const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;


export const productsController = {

    getAllProducts: async (req, res) => {
        let allProducts = await productsQueries.AllProducts();

    
        return res.status(200).json({
            meta: {
                endPoint: getUrl(req),
                total: allProducts[0].length
            },
            data: allProducts[0],
        });
    },

    getProduct: async (req, res) => {

        let id = req.params.id;
        let product = await productsQueries.oneProduct(id)
       
        return res.status(200).json({
            meta: {
                endPoint: getUrl(req),
                total: 1
            },
            data: product[0][0]
        })
    },

    getProductDetails: async (req, res) => {
        let id = req.params.id
        let details = req.params.details;
            details = details.replaceAll('-', '_');
    
        let tables = await pool.query('SHOW TABLES');
        tables = tables[0];
    
        let resultDetails = tables.findIndex(table => {
            return table['Tables_in_centralmusic'] == details
        })
        
       
    
        if(resultDetails == 1) {
            let detailsProduct = await productsQueries.detailsProduct(id, details);
        
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: 1
                }, 
                data: detailsProduct[0][0],
            })
        }else{
            return res.status(404).json('detalles no encontrados');
        }
    },

    getProductsForCategory: async (req, res) => {

        let category = req.params.category;
        category = category.replaceAll('-', ' ');
        let subcategory = req.params.subcategory;


        if(subcategory){
            subcategory = subcategory.replaceAll('-', ' ');
        }
        
        let queryCategories = await categoriesQueries.showCategories();
        let querySubcategories = await categoriesQueries.showSubcategories(category);
        let subcategories = querySubcategories[0];
    
        let i = 0;
        while(i < queryCategories[0].length){
            
            if(queryCategories[0][i].category == category &&  subcategory){
        
                let result = await categoriesQueries.showProductsForSubcategory(subcategory);
                
                return result[0].length == 0 ? res.json({msg: 'no se encontraron productos o la ruta es erronea'}) : res.json(result[0]);
            } else if (queryCategories[0][i].category == category && !subcategory){
                
                let result = await categoriesQueries.showProductsForCategory(category);

                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: result[0].length
                    },
                    data: result[0]
                })
            } else if (queryCategories[0][i].category == category && !(subcategories[i].subcategory == subcategory)){
            
                return res.status(404).json({msg: 'no se encontraron productos'})
            }
            
            
            i++;
        }
        
        
        return res.send('categoria no encontrada');
    
    }
}

