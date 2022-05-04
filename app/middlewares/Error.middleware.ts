import { NextFunction, Request, Response, Express } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { isCelebrateError } from 'celebrate';
import { AbstractMiddleware } from '../contracts/Abstract.middleware';
import { AbstractError } from '../contracts/Abstract.error';

export class ErrorMiddleware extends AbstractMiddleware {

    constructor (private server: Express) {
        super();
    }

    setup = () => {
        this.server.use(this._handleAuthenticationError);
        this.server.use(this._handleApplicationError);
        this.server.use(this._handleJoiCelebrateError);
        this.server.use(this._handleDefaultError);
    };

    public _handleAuthenticationError = (error: Error, _request: Request, response: Response, next: NextFunction) => {
        if (error instanceof JsonWebTokenError) {
            const result = { message: error.message, details: error };
            return response.status(401).json(result);
        }
        next(error);
    }

    public _handleApplicationError = (error: Error, _request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AbstractError) {
            const result = { message: error.message, details: error.constructor.name };
            return response.status(error.getStatusCode()).json(result);
        }
        next(error);
    };

    public _handleJoiCelebrateError = (error: Error, _request: Request, response: Response, next: NextFunction) => {
        if (isCelebrateError(error)) {
            const details = {};

            error.details.forEach((detail) => {
                detail.details.forEach((item) => {
                    const field = item.path[0];
                    const errors = details[field] || [];
                    errors.push(item.message);
                    details[field] = errors;
                });
            });

            const result = { message: error.message, details };
            return response.status(422).json(result);
        }
        next(error);
    };

    public _handleDefaultError = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
        const result = { message: error.message, details: error };
        return response.status(500).json(result);
    };

}
