import { NextFunction, Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export class CadastrarEnderecoValidator {

    static validate = (request: Request, response: Response, next: NextFunction): void => {
        return celebrate(
            {
                [Segments.BODY]: Joi.object().keys({
                    logradouro: Joi.string().required(),
                    numero: Joi.string().min(1).max(8).required(),
                    bairro: Joi.string().min(1).max(64).required(),
                    cidade: Joi.string().min(1).max(64).required(),
                    estado: Joi.string().min(1).max(64).required(),
                    pais: Joi.string().min(1).max(32).required(),
                    cep: Joi.string().min(1).max(8),
                }),
            },
            {
                abortEarly: false,
            },
        )(request, response, next);
    };
}
