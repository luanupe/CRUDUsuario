import "reflect-metadata"
import { container } from 'tsyringe';
import { Application } from './server';
import { Connection } from './connection';

import dotenv from "dotenv";
dotenv.config();

export const setupApplication = async () => {
    const connection = container.resolve(Connection);
    await connection.setup();
    
    const application = new Application();
    application.setupRoutes();
    application.start();
};
