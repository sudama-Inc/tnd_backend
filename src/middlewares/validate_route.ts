'use strict';

import path from 'path';
import httpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';


const BASE_FILE_PATH = '../services';

const validateRoute = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url.toLowerCase().split('?')[0];
    const method = req.method.toLowerCase();
    const routesTypes = ['public', 'secure'];
    const validRoute = routesTypes.some(routeType => {
        try {
            const servicePath = `${BASE_FILE_PATH}/${routeType}${url}_${method}`;
            require(servicePath);
            req['servicePath'] = path.join(__dirname, servicePath);
            req['routeType'] = routeType;
            return true;
        } catch (e) {
            return false;
        }
    });
    if (validRoute) {
        return next();
    }
    return res.status(httpStatus.NOT_FOUND).json({ success: false });
};

export {
    validateRoute
};
