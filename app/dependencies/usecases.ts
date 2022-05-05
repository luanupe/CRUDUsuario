import { container } from 'tsyringe';
import { HealthcheckUsecase } from '../usecases/Healthcheck/Healthcheck.usecase';
import { AutenticarUsuarioUsecase } from '../usecases/Usuario/AutenticarUsuario.usecase';
import { CadastrarUsuarioUsecase } from '../usecases/Usuario/CadastrarUsuario.usecase';
import { BuscarUsuarioUsecase } from '../usecases/Usuario/BuscarUsuario.usecase';
import { AtualizarUsuarioUsecase } from '../usecases/Usuario/AtualizarUsuario.usecase';
import { RemoverUsuarioUsecase } from '../usecases/Usuario/RemoverUsuario.usecase';
import { CadastrarEnderecoUsecase } from '../usecases/Endereco/CadastrarEndereco.usecase';
import { BuscarEnderecoUsecase } from '../usecases/Endereco/BuscarEndereco.usecase';
import { AtualizarEnderecoUsecase } from '../usecases/Endereco/AtualizarEndereco.usecase';
import { RemoverEnderecoUsecase } from '../usecases/Endereco/RemoverEndereco.usecase';

// HealthCheck

container.registerSingleton<HealthcheckUsecase>(
    'HealthcheckUsecase',
    HealthcheckUsecase,
);

// Usuário

container.registerSingleton<AutenticarUsuarioUsecase>(
    'AutenticarUsuarioUsecase',
    AutenticarUsuarioUsecase,
);

container.registerSingleton<CadastrarUsuarioUsecase>(
    'CadastrarUsuarioUsecase',
    CadastrarUsuarioUsecase,
);

container.registerSingleton<BuscarUsuarioUsecase>(
    'BuscarUsuarioUsecase',
    BuscarUsuarioUsecase,
);

container.registerSingleton<AtualizarUsuarioUsecase>(
    'AtualizarUsuarioUsecase',
    AtualizarUsuarioUsecase,
);

container.registerSingleton<RemoverUsuarioUsecase>(
    'RemoverUsuarioUsecase',
    RemoverUsuarioUsecase,
);

// Endereço

container.registerSingleton<CadastrarEnderecoUsecase>(
    'CadastrarEnderecoUsecase',
    CadastrarEnderecoUsecase,
);

container.registerSingleton<BuscarEnderecoUsecase>(
    'BuscarEnderecoUsecase',
    BuscarEnderecoUsecase,
);

container.registerSingleton<AtualizarEnderecoUsecase>(
    'AtualizarEnderecoUsecase',
    AtualizarEnderecoUsecase,
);

container.registerSingleton<RemoverEnderecoUsecase>(
    'RemoverEnderecoUsecase',
    RemoverEnderecoUsecase,
);
