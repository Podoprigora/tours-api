import express from 'express';
import debug from 'debug';

import { AbstractRouter } from '../lib/abstract';
import { loggingRequestMiddleware } from '../lib/middlewares';
import { ToursController } from './tours-controller';
import { ToursMiddlewares } from './tours-middlewares';

const dlog = debug('app:ToursRouter');

export class ToursRouter extends AbstractRouter<express.Application> {
    constructor(app: express.Application) {
        super(app, 'ToursRouter');
    }

    configureRoutes() {
        const toursRoute = this.app.route('/api/v1/tours');

        toursRoute.get(ToursController.getAll);
        toursRoute.post(ToursMiddlewares.validateRequiredRequestBodyFields, ToursController.create);

        const toursByIdRoute = this.app.route('/api/v1/tours/:id');

        toursByIdRoute.all(
            loggingRequestMiddleware('app:ToursRoters'),
            ToursMiddlewares.validateRequestByIdParams
        );
        toursByIdRoute.get(ToursController.getById);
        toursByIdRoute.patch(
            ToursMiddlewares.validateRequiredRequestBodyFields,
            ToursController.update
        );
        toursByIdRoute.delete(ToursController.delete);
    }
}
