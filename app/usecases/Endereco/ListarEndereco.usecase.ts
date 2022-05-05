import { injectable, inject } from "tsyringe";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoEntity } from "../../entities/Endereco.entity";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { mapEnderecos } from "../../adapters/Endereco.adapter";

@injectable()
export class ListarEnderecoUsecase {

    constructor(
        @inject('EnderecoRepository')
        private enderecoRepository: EnderecoRepository,
    ) {}

    run = async (usuarioId: number, cidade?: string): Promise<EnderecoEntity[]> => {
        // Buscar endereços
        const filtros = cidade?.length ? { cidade } : null;
        const enderecos: Endereco[] = await this.enderecoRepository.getByUsuario(usuarioId, filtros);

        // Result
        return mapEnderecos(enderecos);
    };

}
