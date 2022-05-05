
import { Usuario } from "../models/Usuario.model";
import { UsuarioEntity } from "../entities/Usuario.entity";
import { mapEnderecos } from "./Endereco.adapter";

export const mapUsuario = (usuario: Usuario, enderecos: boolean = false): UsuarioEntity => {
    const addresses = enderecos && usuario.enderecos ? mapEnderecos(usuario.enderecos) : [];
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        comunicacoes: usuario.comunicacoes,
        enderecos: addresses,
    };
};
