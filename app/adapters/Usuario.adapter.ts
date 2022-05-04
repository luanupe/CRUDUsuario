import { EnderecoEntity } from "../entities/Endereco.entity";
import { UsuarioEntity } from "../entities/Usuario.entity";
import { Endereco } from "../models/Endereco.model";
import { Usuario } from "../models/Usuario.model";

const mapEnderecos = (enderecos: Endereco[]): EnderecoEntity[] => {
    return enderecos.map((endereco: Endereco): EnderecoEntity => ({
        id: endereco.id,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        pais: endereco.pais,
        cep: endereco.cep,
    }));
}

export const mapUsuario = (usuario: Usuario, enderecos: boolean = false): UsuarioEntity => {
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        comunicacoes: usuario.comunicacoes,
        enderecos: enderecos && usuario.enderecos
                    ? mapEnderecos(usuario.enderecos) 
                    : [],
    };
};
