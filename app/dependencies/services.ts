import { container } from 'tsyringe';
import { JwtService } from '../services/Jwt.service';

container.registerSingleton<JwtService>(
    'JwtService',
    JwtService,
);
