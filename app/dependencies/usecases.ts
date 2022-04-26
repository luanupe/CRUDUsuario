import { container } from 'tsyringe';
import { HealthcheckUsecase } from '../usecases/Healthcheck/Healthcheck.usecase';

container.registerSingleton<HealthcheckUsecase>(
    'HealthcheckUsecase',
    HealthcheckUsecase,
);
