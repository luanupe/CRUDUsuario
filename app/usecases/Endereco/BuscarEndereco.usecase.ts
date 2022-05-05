import { injectable, inject } from "tsyringe";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoEntity } from "../../entities/Endereco.entity";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { mapEndereco } from "../../adapters/Endereco.adapter";
import { NaoEncontradoError } from "../../errors/Endereco/NaoEncontrado.error";

@injectable()
export class BuscarEnderecoUsecase {

    constructor(
        @inject('EnderecoRepository')
        private enderecoRepository: EnderecoRepository,
    ) {}

    run = async (usuarioId: number, enderecoId): Promise<EnderecoEntity> => {
        // Buscar endereço
        const endereco: Endereco = await this.enderecoRepository.getByUsuarioAndId(usuarioId, enderecoId);
        if (!endereco) throw new NaoEncontradoError(usuarioId, enderecoId);

        // Result
        return mapEndereco(endereco);
    };

}
