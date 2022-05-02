import { container } from 'tsyringe';
import { UsuarioRepository } from '../repositories/Usuario.repository';

container.registerSingleton<UsuarioRepository>(
    'UsuarioRepository',
    UsuarioRepository,
);
