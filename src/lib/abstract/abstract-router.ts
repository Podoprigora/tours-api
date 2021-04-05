export abstract class AbstractRouter<T> {
    abstract configureRoutes(): void;

    constructor(private _app: T, private _displayName: string) {
        this.configureRoutes();
    }

    get app() {
        return this._app;
    }

    get displayName() {
        return this._displayName;
    }
}
