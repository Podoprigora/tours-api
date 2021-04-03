import debug from 'debug';

const dlog = debug('app:DataHelpers');

export class DataHelpers {
    static isObject(data: unknown): data is Record<string, unknown> {
        return data ? data instanceof Object : false;
    }

    static isEmptyObject(data: unknown): boolean {
        if (!this.isObject(data)) {
            return true;
        }

        return Object.keys(data).length === 0;
    }

    static hasProp<T>(data: T, path: string): boolean {
        if (!this.isObject(data)) {
            return false;
        }

        const [prop, ...otherPath] = path.split('.');

        if (Object(data).hasOwnProperty(prop)) {
            if (otherPath.length > 0) {
                const newPath = otherPath.join('.');

                return this.hasProp(data[prop], newPath);
            }
            return true;
        }
        return false;
    }
}
