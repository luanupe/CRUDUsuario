import { container } from 'tsyringe';
import { UsuarioRepository } from '../repositories/Usuario.repository';
import { EnderecoRepository } from '../repositories/Endereco.repository';

container.registerSingleton<UsuarioRepository>(
    'UsuarioRepository',
    UsuarioRepository,
);

container.registerSingleton<EnderecoRepository>(
    'EnderecoRepository',
    EnderecoRepository,
);
