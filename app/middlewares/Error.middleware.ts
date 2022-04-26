import { NextFunction, Request, Response, Express } from 'express';
import { AbstractMiddleware } from '../contracts/Abstract.middleware';

export class ErrorMiddleware extends AbstractMiddleware {

    constructor (private server: Express) {
        super();
    }

    setup() {
        this.server.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
            const result = { message: error.message, details: error };
            return response.status(500).json(result);
        });
    }

}
