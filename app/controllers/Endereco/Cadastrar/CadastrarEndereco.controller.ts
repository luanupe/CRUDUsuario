import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { EnderecoEntity } from '../../../entities/Endereco.entity';
import { CadastrarEnderecoUsecase } from '../../../usecases/Endereco/CadastrarEndereco.usecase';

@injectable()
export class CadastrarEnderecoController extends AbstractController {

    constructor(
        @inject('CadastrarEnderecoUsecase')
        private cadastrarEnderecoUsecase: CadastrarEnderecoUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const id = request.usuario.id;
            const logradouro = request.body.logradouro;
            const numero = request.body.numero;
            const bairro = request.body.bairro;
            const cidade = request.body.cidade;
            const estado = request.body.estado;
            const pais = request.body.pais;
            const cep = request.body.cep;

            // Act
            const data = { logradouro, numero, bairro, cidade, estado, pais, cep };
            const result: EnderecoEntity = await this.cadastrarEnderecoUsecase.run(id, data);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
