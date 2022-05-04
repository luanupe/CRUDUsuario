import { NextFunction, Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export class AutenticarUsuarioValidator {

    static validate = (request: Request, response: Response, next: NextFunction): void => {
        return celebrate(
            {
                [Segments.BODY]: Joi.object().keys({
                    email: Joi.string().email().required(),
                    senha: Joi.string().required(),
                }),
            },
            {
                abortEarly: false,
            },
        )(request, response, next);
    };
}
