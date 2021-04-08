import express from 'express';

import { InvalidBodyError } from '../../lib/errors';

export function commonValidateBodyParamsMiddleware(
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
