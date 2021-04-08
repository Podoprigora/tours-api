export class JsonHelpers {
    static parse(content: string): any {
        try {
            return JSON.parse(content);
        } catch {
            return {};
        }
    }

    static parseArray<T = any>(content: string): T[] {
        try {
            const json = this.parse(content);
            return Array.isArray(json) ? json : [json];
        } catch {
            return [];
        }
    }

    static stringify(json: any): string {
        try {
            return JSON.stringify(json);
        } catch {
            return '';
        }
    }
}
