import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { EnderecoEntity } from '../../../entities/Endereco.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { BuscarEnderecoUsecase } from '../../../usecases/Endereco/BuscarEndereco.usecase';

@injectable()
export class VisualizarEnderecoController extends AbstractController {

    constructor(
        @inject('BuscarEnderecoUsecase')
        private buscarEnderecoUsecase: BuscarEnderecoUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const usuarioId = request.usuario.id;
            const enderecoId = Number(request.params.enderecoId);

            // Act
            const result: EnderecoEntity = await this.buscarEnderecoUsecase.run(usuarioId, enderecoId);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
