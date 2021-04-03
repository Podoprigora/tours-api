export class ResponseError extends Error {
    statusCode: number;
    date: Date;

    constructor(code: number, message: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError);
        }

        this.name = 'ResponseError';
        this.statusCode = code;
        this.date = new Date();
    }
}
