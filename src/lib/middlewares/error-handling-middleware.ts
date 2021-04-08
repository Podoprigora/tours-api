import express from 'express';

import { JsendResponseDecorator } from '../response-decorators';

export function errorHandlingMiddleware(
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (error) {
        const jsend = new JsendResponseDecorator(res);

        jsend.sendError(error, 500);
    } else {
        next();
    }
}
