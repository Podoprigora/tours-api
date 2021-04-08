import express from 'express';

import { ResponseMapper } from '../../lib/response-mapper';

export function commonErrorHandlingMiddleware(
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (error) {
        const responseMapper = ResponseMapper.getInstance(res);

        responseMapper.sendError(error, 500);
    } else {
        next();
    }
}
