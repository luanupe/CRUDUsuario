import { NextFunction, Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CpfService } from '../../../services/Cpf.service';

export class CadastrarUsuarioValidator {

    private static ONLY_NUMBERS_REGEX = /^\d+$/;

    static validate = (request: Request, response: Response, next: NextFunction): void => {
        return celebrate(
            {
                [Segments.BODY]: Joi.object().keys({
                    nome: Joi.string().required().max(255),
                    email: Joi.string().email().required(),
                    senha: Joi.string().required(),
                    comunicacoes: Joi.bool().required(),
                    cpf: Joi.string().length(11)
                        .custom((value, helper)=> {
                            if (!CpfService.isCpfValido(value)) {
                                return helper.error('any.invalid');
                            }
                            return value;
                        }),
                    telefone: Joi.string().min(10).max(11).regex(CadastrarUsuarioValidator.ONLY_NUMBERS_REGEX),
                }),
            },
            {
                abortEarly: false,
            },
        )(request, response, next);
    };
}