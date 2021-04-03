import fs from 'fs/promises';
import path from 'path';
import { Application } from 'express';
import debug from 'debug';

import { DataHelpers, JsendResponseMapper, JsonHelpers, ResponseError } from '../lib';
import { AbstractRouter } from '../lib/abstract';

const debugToursRouter = debug('app:ToursRouter');

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
                    throw new ResponseError(404, 'Request params is empty!');
                }

                // Get last id
                let lastId = 0;
                const pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');
                const toursContent = await fs.readFile(pathname, { encoding: 'utf-8' });
                const tours = JsonHelpers.parseArray(toursContent);

                lastId = tours.reduce((result: number, item: unknown): number => {
                    const id = DataHelpers.hasProp(item, 'id')
                        ? parseInt(String(item.id), 10)
                        : result;

                    return Math.max(result, id);
                }, lastId);

                // Add a new record
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
