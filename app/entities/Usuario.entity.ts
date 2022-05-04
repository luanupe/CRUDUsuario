import { EnderecoEntity } from "./Endereco.entity";

export type UsuarioEntity = {
    id: number;
    nome: string;
    email: string;
    comunicacoes: boolean;
    cpf?: string;
    telefone?: string;
    enderecos?: EnderecoEntity[];
};
