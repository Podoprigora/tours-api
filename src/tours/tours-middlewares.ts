import express from 'express';

import { JsendResponseMapper, ResponseError } from '../lib';
import { ToursValidators } from './tours-validators';

export class ToursMiddlewares {
    static async validateRequestByIdParams(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            await ToursValidators.validateRequestByIdParams(req.params);
            next();
        } catch {
            responseMapper.sendError('Invalid params', 400);
        }
    }

    static async validateRequiredRequestBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            await ToursValidators.validateRequestBody(req.body);
            next();
        } catch (e) {
            responseMapper.sendFailure(e);
        }
    }
}
