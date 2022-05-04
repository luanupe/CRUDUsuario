import { container } from 'tsyringe';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';
import { AutenticarUsuarioController } from '../controllers/Usuario/Autenticar/AutenticarUsuario.controller';
import { CadastrarUsuarioController } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.controller';
import { VisualizarUsuarioController } from '../controllers/Usuario/Visualizar/VisualizarUsuario.controller';

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
