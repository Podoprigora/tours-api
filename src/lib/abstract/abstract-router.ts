import { Application } from 'express';

export abstract class AbstractRouter {
    abstract configureRoutes(): void;

    constructor(public readonly app: Application, private _displayName: string) {
        this.configureRoutes();
    }

    get displayName() {
        return this._displayName;
    }
}
