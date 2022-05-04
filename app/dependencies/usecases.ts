import { container } from 'tsyringe';
import { HealthcheckUsecase } from '../usecases/Healthcheck/Healthcheck.usecase';
import { AutenticarUsuarioUsecase } from '../usecases/Usuario/AutenticarUsuario.usecase';
import { CadastrarUsuarioUsecase } from '../usecases/Usuario/CadastrarUsuario.usecase';
import { BuscarUsuarioUsecase } from '../usecases/Usuario/BuscarUsuario.usecase';
import { AtualizarUsuarioUsecase } from '../usecases/Usuario/AtualizarUsuario.usecase';

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

container.registerSingleton<BuscarUsuarioUsecase>(
    'BuscarUsuarioUsecase',
    BuscarUsuarioUsecase,
);

container.registerSingleton<AtualizarUsuarioUsecase>(
    'AtualizarUsuarioUsecase',
    AtualizarUsuarioUsecase,
);
