import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

import { JsendResponseMapper, JsonHelpers, ResponseError } from '../lib';
import { ITour } from '../models';
import { ToursValidators } from './tours-validators';

export class ToursController {
    static async get(req: Request, res: Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');
            const content = await fs.readFile(pathname, { encoding: 'utf-8' });
            const contentArray = JsonHelpers.parseArray(content);
            const tours = await ToursValidators.validateTours(contentArray);

            if (!tours) {
                throw new ResponseError(500, "Can't get data!");
            }

            responseMapper.sendSuccess({ count: tours.length, items: tours });
        } catch (err) {
            responseMapper.sendError(err);
        }
    }

    static async validatePostRequestParams(req: Request, res: Response, next: NextFunction) {
        // Validation post request params
        const responseMapper = new JsendResponseMapper(res);

        try {
            await ToursValidators.validateNewTourRequestParams(req.body);
            next();
        } catch (e) {
            responseMapper.sendFailure(e);
        }
    }

    static async post(req: Request, res: Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            // Get last id
            const pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');
            const toursContent = await fs.readFile(pathname, { encoding: 'utf-8' });
            const contentArray = JsonHelpers.parseArray(toursContent);
            const tours = await ToursValidators.validateTours(contentArray);

            if (!tours) {
                throw new ResponseError(500, "Can't perform saving data!");
            }

            const lastId = tours.reduce((result: number, item): number => {
                return Math.max(result, item.id);
            }, 0);

            // Save a new tour
            const newTour = await ToursValidators.validateTour({
                id: lastId + 1,
                ...req.body
            });

            await fs.writeFile(pathname, JsonHelpers.stringify([...tours, newTour]));

            responseMapper.sendSuccess(newTour);
        } catch (err) {
            responseMapper.sendError(err);
        }
    }

    static async validateRequestByIdParams(req: Request, res: Response, next: NextFunction) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            await ToursValidators.validateRequestByIdParams(req.params);
            next();
        } catch {
            responseMapper.sendError('Invalid params', 400);
        }
    }

    static async getById(req: Request, res: Response) {
        const responseMapper = new JsendResponseMapper(res);

        try {
            const routeParams = req.params;
            const pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');
            const content = await fs.readFile(pathname, { encoding: 'utf-8' });
            const contentArray = JsonHelpers.parseArray(content);
            const tours = await ToursValidators.validateTours(contentArray);

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
}
