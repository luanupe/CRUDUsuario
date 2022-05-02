import { container } from 'tsyringe';
import { HealthcheckUsecase } from '../usecases/Healthcheck/Healthcheck.usecase';
import { CadastrarUsuarioUsecase } from '../usecases/Usuario/CadastrarUsuario.usecase';

container.registerSingleton<HealthcheckUsecase>(
    'HealthcheckUsecase',
    HealthcheckUsecase,
);

container.registerSingleton<CadastrarUsuarioUsecase>(
    'CadastrarUsuarioUsecase',
    CadastrarUsuarioUsecase,
);
