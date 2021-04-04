import { Application } from 'express';

import { AbstractRouter } from '../lib/abstract';
import { ToursController } from './tours-controller';

export class ToursRouter extends AbstractRouter {
    constructor(app: Application) {
        super(app, 'ToursRouter');
    }

    configureRoutes() {
        // Tours route handlers

        const toursRoute = this.app.route('/api/v1/tours');
        toursRoute.get(ToursController.get);
        toursRoute.post(ToursController.validatePostRequestParams, ToursController.post);

        // TourById route handlers

        const toursByIdRoute = this.app.route('/api/v1/tours/:id/:test?');
        toursByIdRoute.all(ToursController.validateRequestByIdParams);
        toursByIdRoute.get(ToursController.getById);
    }
}
