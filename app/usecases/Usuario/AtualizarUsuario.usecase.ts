import bcrypt from "bcryptjs";
import { injectable, inject } from "tsyringe";
import { mapUsuario } from "../../adapters/Usuario.adapter";
import { UsuarioEntity } from "../../entities/Usuario.entity";
import { CpfEmUsoError } from "../../errors/Usuario/CpfEmUso.error";
import { EmailEmUsoError } from "../../errors/Usuario/EmailEmUso.error";
import { Usuario } from "../../models/Usuario.model";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { NaoEncontradoError } from "../../errors/Usuario/NaoEncontrado.error";
import { SenhaIgualAntigaError } from "../../errors/Usuario/SenhaIgualAntiga.error";

@injectable()
export class AtualizarUsuarioUsecase {

    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: UsuarioRepository,
    ) {}

    run = async (id: number, data: Partial<Usuario>): Promise<UsuarioEntity> => {
        // Buscar usuário no banco de dados
        let user = await this.usuarioRepository.getById(id);
        if (!user) throw new NaoEncontradoError(id);

        // Validar se o email já está em uso
        if (data.email) {
            const userByEmail = await this.usuarioRepository.getByEmail(data.email);
            if (userByEmail && userByEmail.id !== user.id) throw new EmailEmUsoError(data.email);
        }

        // Validar se o CPF já está em uso
        if (data.cpf) {
            const userByCpf = await this.usuarioRepository.getByCpf(data.cpf);
            if (userByCpf && userByCpf.id !== user.id) throw new CpfEmUsoError(data.cpf);
        }

        if (data.senha) {
            // Validar senha repetida
            const status = bcrypt.compareSync(data.senha, user.senha);
            if (status) throw new SenhaIgualAntigaError();

            // Encriptar senha
            data.senha = bcrypt.hashSync(data.senha);
        }

        // Atualizar registro na base
        await this.usuarioRepository.update(user.id, {...user,...data});
        
        // Atualizar model
        await user.reload();

        // Result
        return mapUsuario(user);
    };

}
