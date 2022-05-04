import { container } from 'tsyringe';
import { HealthcheckUsecase } from '../usecases/Healthcheck/Healthcheck.usecase';
import { AutenticarUsuarioUsecase } from '../usecases/Usuario/AutenticarUsuario.usecase';
import { CadastrarUsuarioUsecase } from '../usecases/Usuario/CadastrarUsuario.usecase';

// HealthCheck

container.registerSingleton<HealthcheckUsecase>(
    'HealthcheckUsecase',
    HealthcheckUsecase,
);

// Usuário

container.registerSingleton<AutenticarUsuarioUsecase>(
    'AutenticarUsuarioUsecase',
    AutenticarUsuarioUsecase,
);

container.registerSingleton<CadastrarUsuarioUsecase>(
    'CadastrarUsuarioUsecase',
    CadastrarUsuarioUsecase,
);
