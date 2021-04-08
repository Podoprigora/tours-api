import { ResponseError } from './response-error';

export class InvalidBodyError extends ResponseError {
    constructor() {
        super(400, 'Invalid body params!');
    }
}
