import express from 'express';
import { productsController } from '../controllers/productsController.js';
const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/id/:id', productsController.getProduct);
productsRouter.get('/details/:details/id/:id', productsController.getProductDetails);
productsRouter.get('/:category/:subcategory?', productsController.getProductsForCategory);
productsRouter.post('/add', productsController.addProduct);



export { productsRouter };