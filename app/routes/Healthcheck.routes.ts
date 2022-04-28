import { container } from 'tsyringe';
import { Express } from "express";
import { Swagger } from '../server/swagger';
import { AbstractRoutes } from '../contracts/Abstract.routes';
import * as healthcheckSwagger from '../controllers/Healthcheck/Healthcheck.swagger';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';

export class HealthcheckRoutes extends AbstractRoutes {

    private healthcheckController: HealthcheckController;

    constructor(private prefix: string) {
        super();
        this.healthcheckController = container.resolve(HealthcheckController);
    }

    setup = (server: Express, swagger: Swagger) => {
        this.router.get('/', this.healthcheckController.handle);

        swagger.addPath(this.prefix, 'get', healthcheckSwagger.documentation);

        server.use(this.prefix, this.router);
    };

}
