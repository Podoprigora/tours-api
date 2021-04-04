import fs from 'fs/promises';
import path from 'path';
import { Application } from 'express';
import debug from 'debug';

import { DataHelpers, JsendResponseMapper, JsonHelpers, ResponseError } from '../lib';
import { AbstractRouter } from '../lib/abstract';
import { hasIdSchema, IHasId } from '../common/models';

const dlog = debug('app:ToursRouter');

export class ToursRouter extends AbstractRouter {
    constructor(app: Application) {
        super(app, 'ToursRouter');
    }

    configureRoutes() {
        const route = this.app.route('/api/v1/tours');

        route.get(async (req, res) => {
            const responseMapper = new JsendResponseMapper(res);

            try {
                const pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');
                const content = await fs.readFile(pathname, { encoding: 'utf-8' });
                const tours = JsonHelpers.parseArray(content);

                responseMapper.sendSuccess({ count: tours.length, items: tours });
            } catch (err) {
                responseMapper.sendError(err);
            }
        });

        route.post(async (req, res) => {
            const responseMapper = new JsendResponseMapper(res);

            try {
                // Validation request params
                if (DataHelpers.isEmptyObject(req.body)) {
                    throw new ResponseError(404, 'The request params should not be empty!');
                }

                // Get last id
                let lastId = 0;
                const pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');
                const toursContent = await fs.readFile(pathname, { encoding: 'utf-8' });
                const tours = JsonHelpers.parseArray(toursContent);

                lastId = tours.reduce((result: number, item): number => {
                    return hasIdSchema.isValidSync(item) ? Math.max(result, item.id) : result;
                }, lastId);

                // Save a new tour
                const newTour = {
                    id: lastId + 1,
                    ...req.body
                };

                await fs.writeFile(pathname, JsonHelpers.stringify([...tours, newTour]));

                responseMapper.sendSuccess(newTour);
            } catch (err) {
                responseMapper.sendError(err);
            }
        });
    }
}
