import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from "express";
import { JwtEntity } from '../entities/Jwt.entity';
import { JwtService } from "../services/Jwt.service";
import { AbstractMiddleware } from "../contracts/Abstract.middleware";
import { CookieNaoInformadoError } from "../errors/Jwt/CookieNaoInformado.error";
import { CookieInvalidoError } from "../errors/Jwt/CookieInvalido.error";
import { TipoInvalidoError } from "../errors/Jwt/TipoInvalido.error";

@injectable()
export class JwtMiddleware extends AbstractMiddleware {

    constructor (
        @inject('JwtService')
        private jwtService: JwtService,
    ) {
        super();
    }

    setup = () => {};

    public validate = (request: Request, _response: Response, next: NextFunction) => {
        // Validar token informado
        const authorization: string = request.headers.authorization;
        if (!authorization) throw new CookieNaoInformadoError();

        // Validar informações do token
        const data = authorization.split(' ');
        if (data.length !== 2) throw new CookieInvalidoError();
        if (data[0] !== 'Bearer') throw new TipoInvalidoError(data[0]);

        // Validar token
        const userData: JwtEntity = this.jwtService.validar(data[1]);
        request.usuario = userData;

        next();
    };

}
