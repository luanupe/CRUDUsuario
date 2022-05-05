import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { EnderecoEntity } from '../../../entities/Endereco.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { RemoverEnderecoUsecase } from '../../../usecases/Endereco/RemoverEndereco.usecase';

@injectable()
export class DeletarEnderecoController extends AbstractController {

    constructor(
        @inject('RemoverEnderecoUsecase')
        private removerEnderecoUsecase: RemoverEnderecoUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const usuarioId = request.usuario.id;
            const enderecoId = Number(request.params.enderecoId);

            // Act
            const result: EnderecoEntity = await this.removerEnderecoUsecase.run(usuarioId, enderecoId);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
