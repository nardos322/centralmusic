import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import {indexRouter} from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000;
const {productsRouter, categoriesRouter} = indexRouter;


app.use(cors());
app.use(express.json());


app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);





app.get('/api', (req, res) => {
    res.send('API central Music');
});




app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});