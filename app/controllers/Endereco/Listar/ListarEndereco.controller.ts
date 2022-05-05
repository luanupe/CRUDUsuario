import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { EnderecoEntity } from '../../../entities/Endereco.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { ListarEnderecoUsecase } from '../../../usecases/Endereco/ListarEndereco.usecase';

@injectable()
export class ListarEnderecoController extends AbstractController {

    constructor(
        @inject('ListarEnderecoUsecase')
        private listarEnderecoUsecase: ListarEnderecoUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const usuarioId = request.usuario.id;
            const cidade = request.query.cidade as string;

            // Act
            const result: EnderecoEntity[] = await this.listarEnderecoUsecase.run(usuarioId, cidade);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
