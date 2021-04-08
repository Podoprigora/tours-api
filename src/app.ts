import express from 'express';
import {
    commonErrorHandlingMiddleware,
    commonValidateBodyParamsMiddleware
} from './common/middlewares';

import { AbstractRouter } from './lib/abstract';
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
        this._handler.use(express.json(), commonValidateBodyParamsMiddleware);
    }

    private configureRoutes() {
        this._routes = [new ToursRouter(this._handler)];

        this._handler.get('/', (req, res) => {
            res.status(200).send('Server up and running!');
        });
    }

    private handleErrors() {
        this._handler.use(commonErrorHandlingMiddleware);
    }
}

export const app = new App();
