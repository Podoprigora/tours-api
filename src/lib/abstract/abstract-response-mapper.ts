import { ResponseError } from '../errors';

export type ResponseMapperData = Record<string, unknown> | null;

export abstract class AbstactResponseMapper {
    abstract sendSuccess(data: ResponseMapperData): void;

    abstract sendFailure(data: ResponseMapperData): void;

    abstract sendError(error: string | Error | ResponseError, statusCode?: number): void;
}
