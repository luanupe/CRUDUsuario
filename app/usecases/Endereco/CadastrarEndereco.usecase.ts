import { injectable, inject } from "tsyringe";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoEntity } from "../../entities/Endereco.entity";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { mapEndereco } from "../../adapters/Endereco.adapter";

@injectable()
export class CadastrarEnderecoUsecase {

    constructor(
        @inject('EnderecoRepository')
        private enderecoRepository: EnderecoRepository,
    ) {}

    run = async (usuarioId: number, data: Partial<Endereco>): Promise<EnderecoEntity> => {
        // Criar endereço
        const id = await this.enderecoRepository.insert({...data,usuarioId});

        // Buscar endereço
        const endereco = await this.enderecoRepository.getById(id);

        // Result
        return mapEndereco(endereco);
    };

}
