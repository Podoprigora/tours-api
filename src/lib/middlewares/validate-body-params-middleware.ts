import express from 'express';

import { InvalidBodyError } from '../errors';

export function validateBodyParamsMiddleware(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (err) {
        return next(new InvalidBodyError());
    }
    next();
}
