import { Application } from './server'
import dotenv from "dotenv";

dotenv.config();
const application = new Application();

application.setupRoutes();
application.setupPostMiddleware();
application.start();
