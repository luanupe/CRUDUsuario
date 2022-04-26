import { Request, Response, NextFunction } from 'express';

export abstract class AbstractMiddleware {

    abstract setup(request: Request, response: Response, next: NextFunction);

}
