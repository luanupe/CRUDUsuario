import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { UsuarioEntity } from '../../../entities/Usuario.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { RemoverUsuarioUsecase } from '../../../usecases/Usuario/RemoverUsuario.usecase';

@injectable()
export class DeletarUsuarioController extends AbstractController {

    constructor(
        @inject('RemoverUsuarioUsecase')
        private removerUsuarioUsecase: RemoverUsuarioUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const id = request.usuario.id;

            // Act
            const result: UsuarioEntity = await this.removerUsuarioUsecase.run(id);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };

}
