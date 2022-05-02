import { UsuarioEntity } from "../entities/Usuario.entity";
import { Usuario } from "../models/Usuario.model";

export const mapUsuario = (usuario: Usuario): UsuarioEntity => {
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        comunicacoes: usuario.comunicacoes,
    };
};
