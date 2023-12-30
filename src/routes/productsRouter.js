import express from 'express';
import { productsController } from '../controllers/productsController.js';
const productsRouter = express.Router();
const {getAllProducts, getProduct, getProductDetails, getProductsForCategory,
addProduct, addDetailsProduct} = productsController;


productsRouter.get('/', getAllProducts);
productsRouter.get('/id/:id', getProduct);
productsRouter.get('/details/id/:id', getProductDetails);
productsRouter.get('/categories/:category/:subcategory?', getProductsForCategory);
productsRouter.post('/add', addProduct);
productsRouter.post('/details/:productDetail/id/:id',addDetailsProduct );



export { productsRouter };