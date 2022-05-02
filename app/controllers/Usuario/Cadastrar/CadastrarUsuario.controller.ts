import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { CadastrarUsuarioUsecase } from '../../../usecases/Usuario/CadastrarUsuario.usecase';
import { UsuarioEntity } from '../../../entities/Usuario.entity';

@injectable()
export class CadastrarUsuarioController extends AbstractController {

    constructor(
        @inject('CadastrarUsuarioUsecase')
        private cadastrarUsuarioUsecase: CadastrarUsuarioUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const nome = request.body.nome;
            const email = request.body.email;
            const senha = request.body.senha;
            const comunicacoes = Boolean(request.body.comunicacoes);
            const cpf = request.body.cpf;
            const telefone = request.body.telefone;

            // Act
            const data = { nome, email, senha, comunicacoes, cpf, telefone };
            const result: UsuarioEntity = await this.cadastrarUsuarioUsecase.run(data);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
