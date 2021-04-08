import { ResponseError } from '../errors';

export type ResponseMapperData = Record<string, unknown> | null;

export interface ResponseHandler<T> {
    status(code: number): this;
    json(obj: T): this;
}

export abstract class AbstactResponseMapper {
    abstract sendSuccess(data: ResponseMapperData): void;

    abstract sendFailure(data: ResponseMapperData): void;

    abstract sendError(error: string | Error | ResponseError, statusCode?: number): void;
}
