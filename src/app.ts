import express from 'express';

import { AbstractRouter } from './lib/abstract';
import { ResourceNotFoundError } from './lib/errors';
import { errorHandlingMiddleware, validateBodyParamsMiddleware } from './lib/middlewares';
import { JsendResponseDecorator } from './lib/response-decorators';
import { ToursRouter } from './tours';

class App {
    private _handler: express.Application;
    private _routes: Array<AbstractRouter<express.Application>> = [];

    constructor() {
        this._handler = express();

        this.configureMiddlewares();
        this.configureRoutes();
        this.handleErrors();
    }

    get handler() {
        return this._handler;
    }

    get routes() {
        return this._routes;
    }

    private configureMiddlewares() {
        this._handler.use(express.json(), validateBodyParamsMiddleware);
    }

    private configureRoutes() {
        // Custom routes
        this._routes = [new ToursRouter(this._handler)];

        // Root route
        this._handler.get('/', (req, res) => {
            const jsend = new JsendResponseDecorator(res);

            jsend.sendSuccess(null);
        });

        // Not found route
        this._handler.use((req, res, next) => {
            const jsend = new JsendResponseDecorator(res);

            jsend.sendError(new ResourceNotFoundError());
        });
    }

    private handleErrors() {
        this._handler.use(errorHandlingMiddleware);
    }
}

export const app = new App();
