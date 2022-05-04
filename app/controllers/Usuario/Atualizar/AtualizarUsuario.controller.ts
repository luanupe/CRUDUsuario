import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { UsuarioEntity } from '../../../entities/Usuario.entity';
import { AtualizarUsuarioUsecase } from '../../../usecases/Usuario/AtualizarUsuario.usecase';

@injectable()
export class AtualizarUsuarioController extends AbstractController {

    constructor(
        @inject('AtualizarUsuarioUsecase')
        private atualizarUsuarioUsecase: AtualizarUsuarioUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve user
            const id = request.usuario.id;

            // Retrieve data
            const nome = request.body.nome;
            const email = request.body.email;
            const senha = request.body.senha;
            const comunicacoes = Boolean(request.body.comunicacoes);
            const cpf = request.body.cpf;
            const telefone = request.body.telefone;

            // Act
            const data = { nome, email, senha, comunicacoes, cpf, telefone };
            const result: UsuarioEntity = await this.atualizarUsuarioUsecase.run(id, data);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
