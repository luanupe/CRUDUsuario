import { container } from 'tsyringe';
import { JwtMiddleware } from '../middlewares/Jwt.middleware';

container.registerSingleton<JwtMiddleware>(
    'JwtMiddleware',
    JwtMiddleware,
);
