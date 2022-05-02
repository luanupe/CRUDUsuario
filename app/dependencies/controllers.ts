import { container } from 'tsyringe';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';
import { CadastrarUsuarioController } from '../controllers/Usuario/Cadastrar/CadastrarUsuario.controller';

container.registerSingleton<HealthcheckController>(
    'HealthcheckController',
    HealthcheckController,
);

container.registerSingleton<CadastrarUsuarioController>(
    'CadastrarUsuarioController',
    CadastrarUsuarioController,
);
