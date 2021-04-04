export class DataHelpers {
    static isObject(obj: unknown): obj is Record<string, unknown> {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    static isEmptyObject(obj: unknown): boolean {
        if (!this.isObject(obj)) {
            return true;
        }

        return Object.keys(obj).length === 0;
    }
}
