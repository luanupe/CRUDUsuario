export class AbstractError extends Error {
    private statusCode: number;
    
    constructor(message: string, code: number = 500) {
        super(message);
        this.statusCode = code;
    }

    getStatusCode = (): number => {
        return this.statusCode;
    };
}
