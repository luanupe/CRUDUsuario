import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { LoginEntity } from '../../../entities/Login.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { AutenticarUsuarioUsecase } from '../../../usecases/Usuario/AutenticarUsuario.usecase';

@injectable()
export class AutenticarUsuarioController extends AbstractController {

    constructor(
        @inject('AutenticarUsuarioUsecase')
        private autenticarUsuarioUsecase: AutenticarUsuarioUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const email = request.body.email;
            const senha = request.body.senha;

            // Act
            const result: LoginEntity = await this.autenticarUsuarioUsecase.run(email, senha);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
