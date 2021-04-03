export class DataHelpers {
    static isObject(data: unknown): data is Record<string, unknown> {
        return data ? data instanceof Object : false;
    }

    static isEmptyObject(data: unknown): data is {} {
        return data ? (data instanceof Object ? Object.keys(data).length === 0 : false) : false;
    }

    static hasProp(data: unknown, field: string): data is Record<string, unknown> {
        return this.isObject(data) && field in data;
    }
}
