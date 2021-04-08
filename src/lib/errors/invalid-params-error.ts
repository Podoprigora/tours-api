import { ResponseError } from './response-error';

export class InvalidParamsError extends ResponseError {
    constructor() {
        super(400, 'Invalid params!');
    }
}
