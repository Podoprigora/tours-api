export class InvalidFieldError extends Error {
    constructor(public field: string = 'unknown', public errors: Array<string>) {
        super('Invalid filed!');
    }

    toObject() {
        return {
            field: this.field,
            errors: this.errors,
            message: this.message
        };
    }
}
