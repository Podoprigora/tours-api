import express from 'express';

import { JsendResponseMapper } from '../../lib';

export function commonErrorHandlingMiddleware(
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (error) {
        const responseMapper = new JsendResponseMapper(res);

        responseMapper.sendError(error, 500);
    } else {
        next();
    }
}
