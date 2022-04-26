import { Router } from 'express-serve-static-core';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';

export class HealthcheckRoutes {

    static setup(router: Router) {
        const controller = new HealthcheckController();
        router.get('/healthcheck', controller.handle);
    }

}
