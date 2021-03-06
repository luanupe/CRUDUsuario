import { container } from 'tsyringe';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';
import { AutenticarUsuarioController } from '../controllers/Usuario/Autenticar/AutenticarUsuario.controller';
import { CadastrarUsuarioController } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.controller';
import { VisualizarUsuarioController } from '../controllers/Usuario/Visualizar/VisualizarUsuario.controller';
import { AtualizarUsuarioController } from '../controllers/Usuario/Atualizar/AtualizarUsuario.controller';
import { DeletarUsuarioController } from '../controllers/Usuario/Deletar/DeletarUsuario.controller';
import { CadastrarEnderecoController } from '../controllers/Endereco/Cadastrar/CadastrarEndereco.controller';
import { ListarEnderecoController } from '../controllers/Endereco/Listar/ListarEndereco.controller';
import { VisualizarEnderecoController } from '../controllers/Endereco/Visualizar/VisualizarEndereco.controller';
import { DeletarEnderecoController } from '../controllers/Endereco/Deletar/DeletarEndereco.controller';
import { AtualizarEnderecoController } from '../controllers/Endereco/Atualizar/AtualizarEndereco.controller';

// HealthCheck

container.registerSingleton<HealthcheckController>(
    'HealthcheckController',
    HealthcheckController,
);

// Usuário

container.registerSingleton<AutenticarUsuarioController>(
    'AutenticarUsuarioController',
    AutenticarUsuarioController,
);

container.registerSingleton<CadastrarUsuarioController>(
    'CadastrarUsuarioController',
    CadastrarUsuarioController,
);

container.registerSingleton<VisualizarUsuarioController>(
    'VisualizarUsuarioController',
    VisualizarUsuarioController,
);

container.registerSingleton<AtualizarUsuarioController>(
    'AtualizarUsuarioController',
    AtualizarUsuarioController,
);

container.registerSingleton<DeletarUsuarioController>(
    'DeletarUsuarioController',
    DeletarUsuarioController,
);

// Endereço

container.registerSingleton<CadastrarEnderecoController>(
    'CadastrarEnderecoController',
    CadastrarEnderecoController,
);

container.registerSingleton<ListarEnderecoController>(
    'ListarEnderecoController',
    ListarEnderecoController,
);

container.registerSingleton<VisualizarEnderecoController>(
    'VisualizarEnderecoController',
    VisualizarEnderecoController,
);

container.registerSingleton<AtualizarEnderecoController>(
    'AtualizarEnderecoController',
    AtualizarEnderecoController,
);

container.registerSingleton<DeletarEnderecoController>(
    'DeletarEnderecoController',
    DeletarEnderecoController,
);
