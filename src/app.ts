import express, { Application } from 'express';
import {
    deleteProduct,
    getProducts,
    getProductsByID,
    postProduct,
    updateProduct,
} from './logic';
import { findProductsByID, findProductsByIDAndName } from './middlewares';

const app: Application = express();
app.use(express.json());

app.post('/products', postProduct);
app.get('/products', getProducts);
app.get('/products/:id', findProductsByID, getProductsByID);
app.delete('/products/:id', findProductsByID, deleteProduct);
app.patch(
    '/products/:id',
    findProductsByID,
    findProductsByIDAndName,
    updateProduct
);

app.listen(3000, () => {
    console.log('server is running');
});
