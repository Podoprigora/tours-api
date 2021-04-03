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
}
