import { AbstactResponseMapper } from './abstract/abstract-response-mapper';
import { ResponseError } from './response-error';

interface ResponseHandler<T> {
    status(code: number): this;
    json(obj: T): this;
}

type JsendResponseData =
    | (Record<string, unknown> & {
          items?: unknown[];
          count?: number;
      })
    | null;

interface JsendSuccessResponse {
    status: 'success';
    data: JsendResponseData;
}

interface JsendFailureResponse {
    status: 'failure';
    data: JsendResponseData;
}

interface JsendErrorResponse {
    status: 'error';
    message: string;
    statusCode: number;
}

export type JsendResponse = JsendSuccessResponse | JsendFailureResponse | JsendErrorResponse;

export class JsendResponseMapper extends AbstactResponseMapper {
    constructor(private _res: ResponseHandler<JsendResponse>) {
        super();
    }

    get res() {
        return this._res;
    }

    sendSuccess(data: JsendResponseData): void {
        this.res.status(200).json({
            status: 'success',
            data
        });
    }

    sendFailure(data: JsendResponseData) {
        this.res.status(400).json({
            status: 'failure',
            data
        });
    }

    sendError(error: string | Error | ResponseError, statusCode?: number) {
        const message = error instanceof Error ? error.message : error;
        const status = error instanceof ResponseError ? error.statusCode : statusCode || 500;

        const parsedMessage = message.replace(/error:\s*/gi, '');

        this.res.status(status).json({
            status: 'error',
            message: parsedMessage,
            statusCode: status
        });
    }
}
