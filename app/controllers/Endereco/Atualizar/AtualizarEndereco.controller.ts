import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { EnderecoEntity } from '../../../entities/Endereco.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { AtualizarEnderecoUsecase } from '../../../usecases/Endereco/AtualizarEndereco.usecase';

@injectable()
export class AtualizarEnderecoController extends AbstractController {

    constructor(
        @inject('AtualizarEnderecoUsecase')
        private atualizarEnderecoUsecase: AtualizarEnderecoUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const usuarioId = request.usuario.id;
            const enderecoId = Number(request.params.enderecoId);

            // Retrieve data
            const logradouro = request.body.logradouro;
            const numero = request.body.numero;
            const bairro = request.body.bairro;
            const cidade = request.body.cidade;
            const estado = request.body.estado;
            const pais = request.body.pais;
            const cep = request.body.cep;

            // Act
            const data = { logradouro, numero, bairro, cidade, estado, pais, cep };
            const result: EnderecoEntity = await this.atualizarEnderecoUsecase.run(usuarioId, enderecoId, data);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
