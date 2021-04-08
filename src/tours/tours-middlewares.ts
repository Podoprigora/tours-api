import express from 'express';

import { JsendResponseMapper } from '../lib';
import { InvalidParamsError, InvalidFieldError } from '../lib/errors';
import { ToursValidators } from './tours-validators';

export class ToursMiddlewares {
    static async validateRequestByIdParams(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            await ToursValidators.validateRequestByIdParams(req.params);
            next();
        } catch {
            next(new InvalidParamsError());
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
            responseMapper.sendFailure(e instanceof InvalidFieldError ? e.toObject() : e);
        }
    }
}
