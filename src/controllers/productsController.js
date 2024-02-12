import { productsQueries } from '../database/queries/productsQueries.js';
import { categoriesQueries } from '../database/queries/categoriesQueries.js';
import { pool } from '../database/dbConnection.js';

const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;


export const productsController = {

    getAllProducts: async (req, res) => {
        
        try {
            let allProducts = await productsQueries.AllProducts();
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: allProducts[0].length
                },
                data: allProducts,
            });

        }catch(err){
            return res.status(500).json({
                message: 'error en la solicitud'
            });
        }

    },

    getProduct: async (req, res) => {

        try {
            let id = req.params.id;
            let product = await productsQueries.oneProduct(id);
        
            if(product){
                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: 1
                    },
                    data: product
                });
            } else {
                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: 0
                    },
                    message: 'producto no encontrado'
                });
            }
            
            
        } catch(err) {
            return res.status(500).json({
                message: 'error en la solicitud'
            });
        }
       

    },
   
    getProductDetails: async (req, res) => {
        try{
            let id = req.params.id;
        
            let product = await productsQueries.oneProduct(id);
            
            if(!product){

                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: 0
                    },
                    message: 'el producto que busca no existe en la base de datos'
                });
            }
            
            let productDetails = await productsQueries.detailsProduct(id, `${product.category}_details`);

            if(productDetails.length === 0) {
                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: 0
                    },
                    message: 'No se encontraron detalles del producto'
                });
            } else {
                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: productDetails.length
                    },
                    data: productDetails,
                });
            }
                  
        }catch(err){
            return res.status(500).json({
                meta: {
                    endPoint: getUrl(req),
                    total: 0
                },
                message: 'error ',
            });
        }
           
              
    },

    getProductsForCategory: async (req, res) => {
        try {
            let category;
            let subcategory;
            let listProductsSubcategory = [];
            let categoriesAndSub = {}
            let categories = await categoriesQueries.showCategories();
            
            if(req.params.category || req.params.subcategory) {
                category = req.params.category;
                category = category.replaceAll('-', ' ');
                subcategory = req.params.subcategory;
            }
            let productsForCategory = await categoriesQueries.showProductsForCategory(category);
           
            for(const category of categories) {
                categoriesAndSub[category] = await categoriesQueries.showSubcategories(category);
            }
            
          
            if(subcategory){
                subcategory = subcategory.replaceAll('-', ' ');
                for (let i in productsForCategory){
                    if(productsForCategory[i].subcategory == subcategory){
                        listProductsSubcategory.push(productsForCategory[i]);
                        
                    }
                }
                if(listProductsSubcategory.length == 0){
                    return res.status(200).json({
                        meta: {
                            endPoint: getUrl(req),
                            total: 0,
                        },
                        message: 'en la categoria '+ category + ' no se encontraron productos relacionados',
                    });
                }
                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: listProductsSubcategory.length,
                    },
                    data: listProductsSubcategory,
                });
            }
            if(category){
                return res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: productsForCategory.length
                    },
                    data: productsForCategory,
                });
            }
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: Object.keys(categoriesAndSub).length
                },
                categories: categoriesAndSub,
            });
        } catch(err){
           
            return res.status(500).json({
                meta: {
                    endPoint: getUrl(req),
                    total: 0
                },
                message: 'error',
            });
        }
       
        
    
    },

    addProduct: async (req, res) => {
        try {

            let {price, name, description, stock, subcategory, marca} = req.body;
            productsQueries.addProduct(price, name, description, stock, subcategory, marca);
            let allProducts = await productsQueries.AllProducts();
           
            return res.status(201).json({
                meta: {
                    endPoint: getUrl(req),
                    message: 'producto agregado',
    
                },
                total: allProducts.length,
                data: allProducts
                
            });
        } catch (err) {

            return res.status(500).json({
                meta: {
                    endPoint: getUrl(req),
                    total: 0
                },
                message: 'error ',
            });

        }
          
    },
    addDetailsProduct: async (req, res) => {

        let id = req.params.id;
        let details = req.params.productDetail;
            details = details.replaceAll('-', '_');
    
        let tables = await pool.query('SHOW TABLES');
        tables = tables[0];
    
        let resultDetails = tables.findIndex(table => {
            
            return table['Tables_in_centralmusic'] == details;
        });
        
       
        
    }
}

