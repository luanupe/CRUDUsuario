import { injectable, inject } from "tsyringe";
import bcrypt from "bcryptjs";
import { mapUsuario } from "../../adapters/Usuario.adapter";
import { UsuarioEntity } from "../../entities/Usuario.entity";
import { CpfEmUsoError } from "../../errors/Usuario/CpfEmUso.error";
import { EmailEmUsoError } from "../../errors/Usuario/EmailEmUso.error";
import { Usuario } from "../../models/Usuario.model";
import { UsuarioRepository } from "../../repositories/Usuario.repository";

@injectable()
export class CadastrarUsuarioUsecase {

    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: UsuarioRepository,
    ) {}

    run = async (data: Partial<Usuario>): Promise<UsuarioEntity> => {
        // Validar se o email já está em uso
        const userByEmail = await this.usuarioRepository.getByEmail(data.email);
        if (userByEmail) throw new EmailEmUsoError(data.email);

        // Validar se o CPF já está em uso
        const userByCpf = await this.usuarioRepository.getByCpf(data.cpf);
        if (userByCpf) throw new CpfEmUsoError(data.cpf);

        // Encriptar senha
        data.senha = bcrypt.hashSync(data.senha);

        // Cria novo registro na base
        const userId = await this.usuarioRepository.insert(data);
        const user = await this.usuarioRepository.getById(userId);
        
        // Mapear para tirar campos sensíveis
        return mapUsuario(user);
    };

}
