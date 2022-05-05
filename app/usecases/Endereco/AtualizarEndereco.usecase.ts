import { injectable, inject } from "tsyringe";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoEntity } from "../../entities/Endereco.entity";
import { NaoEncontradoError } from "../../errors/Endereco/NaoEncontrado.error";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { mapEndereco } from "../../adapters/Endereco.adapter";

@injectable()
export class AtualizarEnderecoUsecase {

    constructor(
        @inject('EnderecoRepository')
        private enderecoRepository: EnderecoRepository,
    ) {}

    run = async (usuarioId: number, enderecoId: number, data: Partial<Endereco>): Promise<EnderecoEntity> => {
        // Buscar endereço
        const endereco: Endereco = await this.enderecoRepository.getByUsuarioAndId(usuarioId, enderecoId);
        if (!endereco) throw new NaoEncontradoError(usuarioId, enderecoId);

        // Persistir endereço
        await this.enderecoRepository.update(enderecoId, {...endereco,...data});

        // atualizar endereço
        await endereco.reload();

        // Result
        return mapEndereco(endereco);
    };

}
