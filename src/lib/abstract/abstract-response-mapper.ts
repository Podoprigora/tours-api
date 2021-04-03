import { Response } from 'express';

import { ResponseError } from '../response-error';

export type ResponseMapperData = Record<string, unknown> | null;

export abstract class AbstactResponseMapper<T> {
    constructor(protected res: Response<T>) {}

    abstract sendSuccess(data: ResponseMapperData): void;

    abstract sendFailure(data: ResponseMapperData): void;

    abstract sendError(error: string | Error | ResponseError, statusCode?: number): void;
}
