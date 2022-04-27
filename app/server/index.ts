import "reflect-metadata"

import express from "express";
import { HealthcheckRoutes } from "../routes/Healthcheck.routes";
import { ErrorMiddleware } from "../middlewares/Error.middleware";

import '../dependencies/usecases';
import '../dependencies/controllers';

export class Application {

    private server: any;
    private port: number;

    constructor() {
        this.server = express();
        this.port = Number(process.env.SERVER_PORT);
    }

    setupRoutes = () => {
        const router = express.Router();
        HealthcheckRoutes.setup(router);
        this.server.use('/', router);
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
