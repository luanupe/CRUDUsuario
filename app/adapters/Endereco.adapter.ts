import { Endereco } from "../models/Endereco.model";
import { EnderecoEntity } from "../entities/Endereco.entity";

export const mapEndereco = (endereco: Endereco): EnderecoEntity => ({
    id: endereco.id,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    estado: endereco.estado,
    pais: endereco.pais,
    cep: endereco.cep,
});

export const mapEnderecos = (enderecos: Endereco[]): EnderecoEntity[] => {
    return enderecos.map((endereco: Endereco): EnderecoEntity => mapEndereco(endereco));
}
