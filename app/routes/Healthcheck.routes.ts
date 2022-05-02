import { container } from 'tsyringe';
import { Express } from "express";
import { Swagger } from '../server/swagger';
import { AbstractRoutes } from '../contracts/Abstract.routes';
import * as healthcheckSwagger from '../controllers/Healthcheck/Healthcheck.swagger';
import { HealthcheckController } from '../controllers/Healthcheck/Healthcheck.controller';

export class HealthcheckRoutes extends AbstractRoutes {

    private healthcheckController: HealthcheckController;

    constructor(protected prefix: string) {
        super(prefix);
        this.healthcheckController = container.resolve(HealthcheckController);
    }

    _setupRoutes = () => {
        this.router.get('/', this.healthcheckController.handle);
    };

    _setupSwagger = (swagger: Swagger) => {
        swagger.addPath(this.prefix, 'get', healthcheckSwagger.documentation);
    };

}
