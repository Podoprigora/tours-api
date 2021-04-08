import express from 'express';
import debug from 'debug';

import { JsendResponseMapper } from '../lib';
import { ResponseError } from '../lib/errors';
import { ToursValidators } from './tours-validators';
import { ToursFileData } from './tours-file-data';

const dlog = debug('app:ToursController');

export class ToursController {
    static async getAll(req: express.Request, res: express.Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const tours = await ToursFileData.getAll();

            if (!tours) {
                throw new ResponseError(500, "Can't get data!");
            }

            responseMapper.sendSuccess({ count: tours.length, items: tours });
        } catch (err) {
            responseMapper.sendError(err);
        }
    }

    static async create(req: express.Request, res: express.Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const tours = await ToursFileData.getAll();

            if (!tours) {
                throw new ResponseError(500, "Can't perform saving data!");
            }

            const lastId = tours.reduce((result: number, item): number => {
                return Math.max(result, item.id);
            }, 0);

            const newTour = await ToursValidators.validateOne({
                id: lastId + 1,
                ...req.body
            });

            await ToursFileData.changeAll([...tours, newTour]);

            responseMapper.sendSuccess(newTour);
        } catch (err) {
            responseMapper.sendError(err);
        }
    }

    static async getById(req: express.Request, res: express.Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const routeParams = req.params;
            const tours = await ToursFileData.getAll();

            if (!tours) {
                throw new ResponseError(500, "Can't get data!");
            }

            const foundedTour = tours.find((item) => {
                return String(item.id) === routeParams.id;
            });

            if (!foundedTour) {
                throw new ResponseError(404, 'Tour not found!');
            }

            responseMapper.sendSuccess(foundedTour);
        } catch (e) {
            responseMapper.sendError(e);
        }
    }

    static async update(req: express.Request, res: express.Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const routeParams = req.params;
            const tours = await ToursFileData.getAll();

            if (!tours) {
                throw new ResponseError(500, "Can't get data");
            }

            const foundedTour = tours.find((tour) => {
                return String(tour.id) === routeParams.id;
            });

            if (!foundedTour) {
                throw new ResponseError(404, 'Tour not found!');
            }

            const newTour = await ToursValidators.validateOne({
                ...foundedTour,
                ...req.body
            });

            const newTours = tours.filter((tour) => {
                return String(tour.id) !== routeParams.id;
            });

            await ToursFileData.changeAll([...newTours, newTour]);

            responseMapper.sendSuccess(newTour);
        } catch (e) {
            responseMapper.sendError(e);
        }
    }

    static async delete(req: express.Request, res: express.Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const routeParams = req.params;
            const tours = await ToursFileData.getAll();

            if (!tours) {
                throw new ResponseError(500, "Can't get data");
            }

            const foundedTour = tours.find((tour) => {
                return String(tour.id) === routeParams.id;
            });

            if (!foundedTour) {
                throw new ResponseError(404, 'Tour not found!');
            }

            const newTours = tours.filter((tour) => {
                return String(tour.id) !== routeParams.id;
            });

            await ToursFileData.changeAll(newTours);

            responseMapper.sendSuccess({ id: routeParams.id });
        } catch (e) {
            responseMapper.sendError(e);
        }
    }
}
