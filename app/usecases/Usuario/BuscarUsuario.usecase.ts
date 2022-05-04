import { injectable, inject } from "tsyringe";
import { mapUsuario } from "../../adapters/Usuario.adapter";
import { UsuarioEntity } from "../../entities/Usuario.entity";
import { NaoEncontradoError } from "../../errors/Usuario/NaoEncontrado.error";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { EnderecoRepository } from "../../repositories/Endereco.repository";

@injectable()
export class BuscarUsuarioUsecase {

    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: UsuarioRepository,
        @inject('EnderecoRepository')
        private enderecoRepository: EnderecoRepository,
    ) {}

    run = async (id: number): Promise<UsuarioEntity> => {
        // Buscar usuário
        const user = await this.usuarioRepository.getById(id);
        if (!user) throw new NaoEncontradoError(id);

        // Buscar enderecos
        user.enderecos = await this.enderecoRepository.getByUsuario(user.id);

        // Result
        return mapUsuario(user, true);
    };

}
