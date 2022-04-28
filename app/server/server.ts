import "reflect-metadata"
import express, { Express } from "express";
import { Swagger } from "./swagger";
import { HealthcheckRoutes } from "../routes/Healthcheck.routes";

import '../dependencies/server';
import '../dependencies/repositories';
import '../dependencies/usecases';
import '../dependencies/controllers';

export class Application {

    private swagger: Swagger;
    private server: Express;
    private port: number;

    constructor() {
        this.server = express();
        this.port = Number(process.env.SERVER_PORT);
        this.swagger = new Swagger(this.server);
    }

    setupRoutes = () => {
        // HealthCheck
        const healthCheckRouter = new HealthcheckRoutes('/healthcheck');
        healthCheckRouter.setup(this.server, this.swagger);

        // Swagger
        this.swagger.setup();
    }

    start = () => {
        this.server.listen(this.port, () => {
            console.log(`Server running at ${this.port}`);
        });
    };

}
