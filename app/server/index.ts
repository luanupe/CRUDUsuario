import express from "express";
import { ErrorMiddleware } from "../middlewares/Error.middleware";

export class Application {

    private server: any;
    private port: number;

    constructor() {
        this.server = express();
        this.port = Number(process.env.SERVER_PORT);
    }

    setupRoutes() {
        const router = express.Router();
        this.server.use('/', router);
    }

    setupPostMiddleware() {
        const error = new ErrorMiddleware(this.server);
        error.setup();
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running at ${this.port}`);
        });
    }

}
