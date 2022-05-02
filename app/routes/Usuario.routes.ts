import { container } from 'tsyringe';
import { Express } from "express";
import { Swagger } from '../server/swagger';
import { AbstractRoutes } from '../contracts/Abstract.routes';
import * as cadastrarUsuarioSwagger from '../controllers/Usuario/Cadastrar/CadastrarUsuario.swagger';
import { CadastrarUsuarioController } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.controller';
import { CadastrarUsuarioValidator } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.validator';

export class UsuarioRoutes extends AbstractRoutes {

    private cadastrarUsuarioController: CadastrarUsuarioController;

    constructor(protected prefix: string) {
        super(prefix);
        this.cadastrarUsuarioController = container.resolve(CadastrarUsuarioController);
    }

    _setupRoutes = () => {
        this.router.post('/cadastrar', CadastrarUsuarioValidator.validate, this.cadastrarUsuarioController.handle);
    };

    _setupSwagger = (swagger: Swagger) => {
        swagger.addPath(`${this.prefix}/cadastrar`, 'post', cadastrarUsuarioSwagger.documentation);
    };

}
