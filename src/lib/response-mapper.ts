import { ResponseHandler } from './abstract/abstract-response-mapper';
import { JsendResponse, JsendResponseMapper } from './jsend-response-mapper';

export class ResponseMapper {
    static getInstance(res: ResponseHandler<JsendResponse>) {
        return new JsendResponseMapper(res);
    }
}
