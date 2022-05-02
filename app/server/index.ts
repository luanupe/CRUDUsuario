import "reflect-metadata"
import "./environment"

import { container } from 'tsyringe';
import { Application } from './server';
import { Connection } from './connection';

export const setupApplication = async () => {
    const connection = container.resolve(Connection);
    await connection.setup();
    
    const application = new Application();
    application.setupPreMiddleware();
    application.setupRoutes();
    application.setupPostMiddleware();
    application.start();
};
