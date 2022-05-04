import bcrypt from "bcryptjs";
import { injectable, inject } from "tsyringe";
import { Usuario } from "../../models/Usuario.model";
import { LoginEntity } from "../../entities/Login.entity";
import { mapUsuario } from "../../adapters/Usuario.adapter";
import { CredencialInvalidaError } from "../../errors/Usuario/CredencialInvalida.error";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { JwtService } from "../../services/Jwt.service";
import { JwtEntity } from "../../entities/Jwt.entity";

@injectable()
export class AutenticarUsuarioUsecase {

    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: UsuarioRepository,
        @inject('JwtService')
        private jwtService: JwtService,
    ) {}

    run = async (email: string, senha: string): Promise<LoginEntity> => {
        // Buscar usuário
        const user: Usuario = await this.usuarioRepository.getByEmail(email);
        if (!user) throw new CredencialInvalidaError(email);

        // Validar a senha
        const status = bcrypt.compareSync(senha, user.senha);
        if (!status) throw new CredencialInvalidaError(email);

        // Gerar JWT
        const data: JwtEntity = { id: user.id, email: user.email };
        const bearer = this.jwtService.assinar(data);
        
        // Response
        const usuario = mapUsuario(user);
        return { usuario, bearer };
    };

}
