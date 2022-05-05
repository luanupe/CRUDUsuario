import { container } from 'tsyringe';
import { Swagger } from '../server/swagger';
import { AbstractRoutes } from '../contracts/Abstract.routes';
import { JwtMiddleware } from '../middlewares/Jwt.middleware';
import * as cadastrarEnderecoSwagger from '../controllers/Endereco/Cadastrar/CadastrarEndereco.swagger';
import { CadastrarEnderecoValidator } from '../controllers/Endereco/Cadastrar/CadastrarEndereco.validator';
import { CadastrarEnderecoController } from '../controllers/Endereco/Cadastrar/CadastrarEndereco.controller';
import * as visualizarEnderecoSwagger from '../controllers/Endereco/Visualizar/VisualizarEndereco.swagger';
import { VisualizarEnderecoController } from '../controllers/Endereco/Visualizar/VisualizarEndereco.controller';
import * as deletarEnderecoSwagger from '../controllers/Endereco/Deletar/DeletarEndereco.swagger';
import { DeletarEnderecoController } from '../controllers/Endereco/Deletar/DeletarEndereco.controller';

export class EnderecoRoutes extends AbstractRoutes {

    private jwtMiddleware: JwtMiddleware;
    private cadastrarEnderecoController: CadastrarEnderecoController;
    private visualizarEnderecoController: VisualizarEnderecoController;
    private deletarEnderecoController: DeletarEnderecoController;

    constructor(protected prefix: string) {
        super(prefix);
        this.jwtMiddleware = container.resolve(JwtMiddleware);
        this.cadastrarEnderecoController = container.resolve(CadastrarEnderecoController);
        this.visualizarEnderecoController = container.resolve(VisualizarEnderecoController);
        this.deletarEnderecoController = container.resolve(DeletarEnderecoController);
    }

    _setupRoutes = () => {
        this.router.post(
            '/cadastrar',
            CadastrarEnderecoValidator.validate,
            this.jwtMiddleware.validate,
            this.cadastrarEnderecoController.handle,
        );

        this.router.get(
            '/visualizar/:enderecoId',
            this.jwtMiddleware.validate,
            this.visualizarEnderecoController.handle,
        );

        this.router.delete(
            '/deletar/:enderecoId',
            this.jwtMiddleware.validate,
            this.deletarEnderecoController.handle,
        );
    };

    _setupSwagger = (swagger: Swagger) => {
        swagger.addPath(`${this.prefix}/cadastrar`, 'post', cadastrarEnderecoSwagger.documentation);
        swagger.addPath(`${this.prefix}/visualizar/{enderecoId}`, 'get', visualizarEnderecoSwagger.documentation);
        swagger.addPath(`${this.prefix}/deletar/{enderecoId}`, 'delete', deletarEnderecoSwagger.documentation);
    };

}
