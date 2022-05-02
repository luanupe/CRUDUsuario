import { container } from 'tsyringe';
import { Connection } from '../server/connection';

container.registerSingleton<Connection>(
    'Connection',
    Connection,
);
