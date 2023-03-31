import { Request, Response } from 'express';
import market from './database';
import { IFoodProduct, IProduct, tProductRequest } from './interfaces';

let nextid = 1;

const postProduct = (request: Request, response: Response): Response => {
    const productData: tProductRequest[] = request.body;

    productData.forEach((element) => {
        const productexist = market.findIndex(
            (products) => products.name === element.name
        );
        if (productexist >= 0) {
            return response.status(409).json({
                error: 'Product already registered',
            });
        }
    });

    const responseArray = productData.map((product) => {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        const newProduct: IProduct = {
            id: nextid,
            ...product,
            expirationDate,
        };

        market.push(newProduct);

        nextid += 1;

        return newProduct;
    });

    return response.status(201).json({
        total: responseArray.reduce((acc, current) => {
            return acc + current.price;
        }, 0),
        marketProducts: responseArray,
    });
};

const getProducts = (request: Request, response: Response): Response => {
    return response.json({
        total: market.reduce((acc, current) => {
            return acc + current.price;
        }, 0),
        marketProducts: market,
    });
};

const getProductsByID = (request: Request, response: Response): Response => {
    return response.json(market[response.locals.market.findIndex]);
};

const deleteProduct = (request: Request, response: Response): Response => {
    market.splice(response.locals.market.findIndex, 1);
    return response.status(204).send();
};

const updateProduct = (request: Request, response: Response): Response => {
    const index = response.locals.market.findIndex;
    const { id, section, expirationDate, ...payload } = request.body;

    market[index] = {
        ...market[index],
        ...payload,
    };
    return response.status(200).json(market[index]);
};

export {
    postProduct,
    getProducts,
    getProductsByID,
    deleteProduct,
    updateProduct,
};
