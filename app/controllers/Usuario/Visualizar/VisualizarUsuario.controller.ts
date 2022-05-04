import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { UsuarioEntity } from '../../../entities/Usuario.entity';
import { AbstractController } from "../../../contracts/Abstract.controller";
import { BuscarUsuarioUsecase } from '../../../usecases/Usuario/BuscarUsuario.usecase';

@injectable()
export class VisualizarUsuarioController extends AbstractController {

    constructor(
        @inject('BuscarUsuarioUsecase')
        private buscarUsuarioUsecase: BuscarUsuarioUsecase,
    ) {
        super();
    }

    handle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Retrieve data
            const id = request.usuario.id;

            // Act
            const result: UsuarioEntity = await this.buscarUsuarioUsecase.run(id);

            // OK
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
