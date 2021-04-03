export class JsonHelpers {
    static parse(content: string): unknown {
        try {
            return JSON.parse(content);
        } catch {
            return {};
        }
    }

    static parseArray<T = unknown>(content: string): T[] {
        try {
            const json = this.parse(content);
            return Array.isArray(json) ? json : [json];
        } catch {
            return [];
        }
    }

    static stringify(json: unknown): string {
        try {
            return JSON.stringify(json);
        } catch {
            return '';
        }
    }
}
