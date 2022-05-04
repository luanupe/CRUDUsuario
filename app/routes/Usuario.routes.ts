import { container } from 'tsyringe';
import { Swagger } from '../server/swagger';
import { AbstractRoutes } from '../contracts/Abstract.routes';
import { JwtMiddleware } from '../middlewares/Jwt.middleware';
import * as autenticarUsuarioSwagger from '../controllers/Usuario/Autenticar/AutenticarUsuario.swagger';
import { AutenticarUsuarioValidator } from '../controllers/Usuario/Autenticar/AutenticarUsuario.validator';
import { AutenticarUsuarioController } from '../controllers/Usuario/Autenticar/AutenticarUsuario.controller';
import * as cadastrarUsuarioSwagger from '../controllers/Usuario/Cadastrar/CadastrarUsuario.swagger';
import { CadastrarUsuarioValidator } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.validator';
import { CadastrarUsuarioController } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.controller';
import * as visualizarUsuarioSwagger from '../controllers/Usuario/Visualizar/VisualizarUsuario.swagger';
import { VisualizarUsuarioController } from '../controllers/Usuario/Visualizar/VisualizarUsuario.controller';

export class UsuarioRoutes extends AbstractRoutes {

    private jwtMiddleware: JwtMiddleware;
    private autenticarUsuarioController: AutenticarUsuarioController;
    private cadastrarUsuarioController: CadastrarUsuarioController;
    private visualizarUsuarioController: VisualizarUsuarioController;

    constructor(protected prefix: string) {
        super(prefix);
        this.jwtMiddleware = container.resolve(JwtMiddleware);
        this.autenticarUsuarioController = container.resolve(AutenticarUsuarioController);
        this.cadastrarUsuarioController = container.resolve(CadastrarUsuarioController);
        this.visualizarUsuarioController = container.resolve(VisualizarUsuarioController);
    }

    _setupRoutes = () => {
        this.router.post('/autenticar', AutenticarUsuarioValidator.validate, this.autenticarUsuarioController.handle);
        this.router.post('/cadastrar', CadastrarUsuarioValidator.validate, this.cadastrarUsuarioController.handle);
        this.router.get('/visualizar', this.jwtMiddleware.validate, this.visualizarUsuarioController.handle);
    };

    _setupSwagger = (swagger: Swagger) => {
        swagger.addPath(`${this.prefix}/autenticar`, 'post', autenticarUsuarioSwagger.documentation);
        swagger.addPath(`${this.prefix}/cadastrar`, 'post', cadastrarUsuarioSwagger.documentation);
        swagger.addPath(`${this.prefix}/visualizar`, 'get', visualizarUsuarioSwagger.documentation);
    };

}
