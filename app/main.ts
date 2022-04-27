import { Application } from './server/index';
import { Connection } from './server/connection';
import dotenv from "dotenv";

const setupApplication = async () => {
    const connection: Connection = new Connection();
    await connection.setup();
    
    const application = new Application();
    application.setupRoutes();
    application.setupPostMiddleware();
    application.start();
};

dotenv.config();
setupApplication();

