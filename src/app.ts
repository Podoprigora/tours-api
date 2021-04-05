import express, { NextFunction, Request, Response } from 'express';

import { JsendResponseMapper } from './lib';
import { AbstractRouter } from './lib/abstract';
import { ToursRouter } from './tours';
import { UsersRouter } from './users';

class App {
    private _handler: express.Application;
    private _routes: Array<AbstractRouter<express.Application>> = [];

    constructor() {
        this._handler = express();

        this.configureMiddlewares();
        this.configureRoutes();
    }

    get handler() {
        return this._handler;
    }

    get routes() {
        return this._routes;
    }

    private errorHandler() {
        return (error: any, req: Request, res: Response, next: NextFunction) => {
            if (error) {
                const responseMapper = new JsendResponseMapper(res);

                responseMapper.sendError(error, 404);
            } else {
                next();
            }
        };
    }

    private configureMiddlewares() {
        this._handler.use(express.json());

        // Should always be placed last
        this._handler.use(this.errorHandler());
    }

    private configureRoutes() {
        this._routes = [new ToursRouter(this._handler)];

        this._handler.get('/', (req, res) => {
            res.status(200).send('Server up and running!');
        });
    }
}

export const app = new App();
