import express, { Express, Router } from 'express';
import { Swagger } from '../server/swagger';

export abstract class AbstractRoutes {

    protected router: Router;

    constructor() {
        this.router = express.Router();
    }

    abstract setup(server: Express, swagger: Swagger);

}
