import { ResponseError } from './response-error';

export class ResourceNotFoundError extends ResponseError {
    constructor() {
        super(404, 'Resouce not found!');
    }
}
