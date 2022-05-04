import { container } from 'tsyringe';
import { Swagger } from '../server/swagger';
import { AbstractRoutes } from '../contracts/Abstract.routes';
import * as autenticarUsuarioSwagger from '../controllers/Usuario/Autenticar/AutenticarUsuario.swagger';
import { AutenticarUsuarioValidator } from '../controllers/Usuario/Autenticar/AutenticarUsuario.validator';
import { AutenticarUsuarioController } from '../controllers/Usuario/Autenticar/AutenticarUsuario.controller';
import * as cadastrarUsuarioSwagger from '../controllers/Usuario/Cadastrar/CadastrarUsuario.swagger';
import { CadastrarUsuarioValidator } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.validator';
import { CadastrarUsuarioController } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.controller';

export class UsuarioRoutes extends AbstractRoutes {

    private autenticarUsuarioController: AutenticarUsuarioController;
    private cadastrarUsuarioController: CadastrarUsuarioController;

    constructor(protected prefix: string) {
        super(prefix);
        this.autenticarUsuarioController = container.resolve(AutenticarUsuarioController);
        this.cadastrarUsuarioController = container.resolve(CadastrarUsuarioController);
    }

    _setupRoutes = () => {
        this.router.post('/autenticar', AutenticarUsuarioValidator.validate, this.autenticarUsuarioController.handle);
        this.router.post('/cadastrar', CadastrarUsuarioValidator.validate, this.cadastrarUsuarioController.handle);
    };

    _setupSwagger = (swagger: Swagger) => {
        swagger.addPath(`${this.prefix}/autenticar`, 'post', autenticarUsuarioSwagger.documentation);
        swagger.addPath(`${this.prefix}/cadastrar`, 'post', cadastrarUsuarioSwagger.documentation);
    };

}
