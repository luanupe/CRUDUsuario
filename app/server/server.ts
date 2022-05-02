import "reflect-metadata"
import express, { Express } from "express";
import bodyParser from "body-parser";
import { Swagger } from "./swagger";
import { ErrorMiddleware } from "../middlewares/Error.middleware";
import { UsuarioRoutes } from "../routes/Usuario.routes";
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

    setupPreMiddleware = () => {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
    };

    setupRoutes = () => {
        // HealthCheck
        const healthCheckRouter = new HealthcheckRoutes('/healthcheck');
        healthCheckRouter.setup(this.server, this.swagger);

        // Usuário
        const usuarioRouter = new UsuarioRoutes('/usuario');
        usuarioRouter.setup(this.server, this.swagger);

        // Swagger
        this.swagger.setup();
    }

    setupPostMiddleware = () => {
        const error = new ErrorMiddleware(this.server);
        error.setup();
    };

    start = () => {
        this.server.listen(this.port, () => {
            console.log(`Server running at ${this.port}`);
        });
    };

}
