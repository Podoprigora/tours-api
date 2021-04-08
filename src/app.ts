import express from 'express';

import { AbstractRouter } from './lib/abstract';
import { errorHandlingMiddleware, validateBodyParamsMiddleware } from './lib/middlewares';
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
        this._routes = [new ToursRouter(this._handler)];

        this._handler.get('/', (req, res) => {
            res.status(200).send('Server up and running!');
        });
    }

    private handleErrors() {
        this._handler.use(errorHandlingMiddleware);
    }
}

export const app = new App();
