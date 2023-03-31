import { NextFunction, Request, Response } from 'express';
import market from './database';
import { IProduct } from './interfaces';

const findProductsByID = (
    request: Request,
    response: Response,
    next: NextFunction
): Response | void => {
    const id = Number(request.params.id);

    const findIndex = market.findIndex((prod) => prod.id === id);

    if (findIndex === -1) {
        return response.status(404).json({
            error: 'Product not found',
        });
    }

    response.locals.market = {
        idProduct: id,
        findIndex: findIndex,
    };

    return next();
};

const findProductsByIDAndName = (
    request: Request,
    response: Response,
    next: NextFunction
): Response | void => {
    const { name } = request.body;
    const id = Number(request.params.id);

    const find = market.find((prod) => prod.name === name);

    const findIndex = market.findIndex((prod) => prod.id === id);

    if (find) {
        return response.status(409).json({
            error: 'Product ja existe',
        });
    }

    response.locals.market = {
        findIndex: findIndex,
    };

    return next();
};
export { findProductsByID, findProductsByIDAndName };
