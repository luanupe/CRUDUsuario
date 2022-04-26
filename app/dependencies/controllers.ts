import { container } from 'tsyringe';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';

container.registerSingleton<HealthcheckController>(
    'HealthcheckController',
    HealthcheckController,
);
