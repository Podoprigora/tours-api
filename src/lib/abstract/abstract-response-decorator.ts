import express from 'express';

import { ResponseError } from '../errors';

export type ResponseMapperData = Record<string, unknown> | null;

export interface ResponseHandler<T> {
    status(code: number): this;
    json(obj: T): this;
}

export abstract class AbstactResponseDecorator<T> {
    constructor(private _res: express.Response<T>) {}

    get res() {
        return this._res;
    }

    abstract sendSuccess(data: ResponseMapperData): void;

    abstract sendFailure(data: ResponseMapperData): void;

    abstract sendError(error: string | Error | ResponseError, statusCode?: number): void;
}
