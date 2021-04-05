import express from 'express';

import { AbstractRouter } from '../lib/abstract';
import { ToursController } from './tours-controller';
import { ToursMiddlewares } from './tours-middlewares';

export class ToursRouter extends AbstractRouter<express.Application> {
    constructor(app: express.Application) {
        super(app, 'ToursRouter');
    }

    configureRoutes() {
        const toursRoute = this.app.route('/api/v1/tours');

        toursRoute.get(ToursController.getAll);
        toursRoute.post(ToursMiddlewares.validateRequiredRequestBodyFields, ToursController.create);

        const toursByIdRoute = this.app.route('/api/v1/tours/:id/:test?');

        toursByIdRoute.all(ToursMiddlewares.validateRequestByIdParams);
        toursByIdRoute.get(ToursController.getById);
        toursByIdRoute.patch(
            ToursMiddlewares.validateRequiredRequestBodyFields,
            ToursController.update
        );
        toursByIdRoute.delete(ToursController.delete);
    }
}
