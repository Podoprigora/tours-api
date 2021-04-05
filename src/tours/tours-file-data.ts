import fs from 'fs/promises';
import path from 'path';
import { JsonHelpers } from '../lib';

import { ITour } from '../models';
import { ToursValidators } from './tours-validators';

export class ToursFileData {
    private static _pathname = path.resolve(__dirname, '../dev-data/data/tours-simple.json');

    static get pathname() {
        return this._pathname;
    }

    static async getAll(): Promise<ITour[] | undefined> {
        const json = await fs.readFile(this._pathname, { encoding: 'utf-8' });
        const contentArray = JsonHelpers.parseArray(json);

        return ToursValidators.validateArray(contentArray);
    }

    static async changeAll(tours: ITour[]) {
        return fs.writeFile(this._pathname, JsonHelpers.stringify(tours));
    }
}
