import express, { Express, Router } from 'express';
import { Swagger } from '../server/swagger';

export abstract class AbstractRoutes {

    protected router: Router;

    constructor(protected prefix: string) {
        this.router = express.Router();
    }

    setup = (server: Express, swagger: Swagger) => {
        this._setupRoutes();
        this._setupSwagger(swagger);
        server.use(this.prefix, this.router);
    };

    abstract _setupRoutes();

    abstract _setupSwagger(swagger: Swagger);

}
