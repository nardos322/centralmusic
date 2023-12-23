import express from 'express';
import { productsRouter } from './routes/productsRouter.js';
import { categoriesRouter } from './routes/categoriesRouter.js';
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);





app.get('/', (req, res) => {
    res.send('API central Music');
});




app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});