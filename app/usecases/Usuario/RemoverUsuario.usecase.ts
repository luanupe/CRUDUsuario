import { injectable, inject } from "tsyringe";
import { mapUsuario } from "../../adapters/Usuario.adapter";
import { UsuarioEntity } from "../../entities/Usuario.entity";
import { NaoEncontradoError } from "../../errors/Usuario/NaoEncontrado.error";
import { UsuarioRepository } from "../../repositories/Usuario.repository";

@injectable()
export class RemoverUsuarioUsecase {

    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: UsuarioRepository,
    ) {}

    run = async (id: number): Promise<UsuarioEntity> => {
        // Buscar usuário
        const user = await this.usuarioRepository.getById(id);
        if (!user) throw new NaoEncontradoError(id);

        // Apagar usuário
        await this.usuarioRepository.delete(user.id);

        // Result
        return mapUsuario(user);
    };

}
