import { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';

export class Swagger {

    private paths;
    private servers;

    constructor(private server: Express) {
        this.paths = {};

        this.servers = [{
            url: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
        }];
    }

    setup = () => {
        const options = this.getConfig();
        this.server.use('/', swaggerUi.serve, swaggerUi.setup(options));
    };

    addPath = (path: string, method: string, definition: any) => {
        if (!this.paths[path]) this.paths[path] = {};
        this.paths[path][method] = definition;
    };

    getConfig = () => {
        return {
            openapi: '3.0.3',
            basePath: '/',
            info: {
                title: process.env.npm_package_name,
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
            },
            components: {
                securitySchemes: {
                    jwt: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'bearer',
                    },
              },
            },
            servers: this.servers,
            paths: this.paths,
        };
    };

}