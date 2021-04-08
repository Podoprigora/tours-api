import express from 'express';

import { InvalidParamsError, InvalidFieldError } from '../lib/errors';
import { JsendResponseDecorator } from '../lib/response-decorators';
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
        const jsend = new JsendResponseDecorator(res);

        try {
            await ToursValidators.validateRequestBody(req.body);
            next();
        } catch (e) {
            const error = e instanceof InvalidFieldError ? e.toObject() : e;

            jsend.sendFailure(error, e?.message);
        }
    }
}
