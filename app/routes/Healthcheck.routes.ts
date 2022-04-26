import { container } from 'tsyringe';
import { Router } from 'express-serve-static-core';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';

export class HealthcheckRoutes {

    static setup(router: Router) {
        const healthcheckController = container.resolve(HealthcheckController);
        router.get('/healthcheck', healthcheckController.handle);
    }

}
