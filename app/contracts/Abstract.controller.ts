import { Request, Response, NextFunction } from 'express';

export abstract class AbstractController {

    abstract handle(request: Request, response: Response, next: NextFunction);

}
