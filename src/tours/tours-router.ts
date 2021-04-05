import express from 'express';

import { AbstractRouter } from '../lib/abstract';
import { ToursController } from './tours-controller';
import { ToursMiddlewares } from './tours-middlewares';
import { commonLoggingRequestMiddleware } from '../common/middlewares';
import { commonErrorHandlingMiddleware } from '../common/middlewares/common-error-handling-middleware';

export class ToursRouter extends AbstractRouter<express.Application> {
    constructor(app: express.Application) {
        super(app, 'ToursRouter');
    }

    configureRoutes() {
        const toursRoute = this.app.route('/api/v1/tours');

        toursRoute.get(ToursController.getAll);
        toursRoute.post(ToursMiddlewares.validateRequiredRequestBodyFields, ToursController.create);

        const toursByIdRoute = this.app.route('/api/v1/tours/:id/:test?');

        toursByIdRoute.all(
            commonLoggingRequestMiddleware('app:ToursRoters'),
            ToursMiddlewares.validateRequestByIdParams,
            commonErrorHandlingMiddleware
        );
        toursByIdRoute.get(ToursController.getById);
        toursByIdRoute.patch(
            ToursMiddlewares.validateRequiredRequestBodyFields,
            ToursController.update
        );
        toursByIdRoute.delete(ToursController.delete);
    }
}
