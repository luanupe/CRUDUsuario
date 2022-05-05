import { injectable, inject } from "tsyringe";
import { FindOptionsWhere, Repository } from "typeorm";
import { Connection } from "../server/connection";
import { Endereco } from "../models/Endereco.model";

@injectable()
export class EnderecoRepository {

    private repository: Repository<Endereco>;

    constructor(
        @inject('Connection')
        private connection: Connection,
    ) {
        this.repository = this.connection.getDataSource().getRepository(Endereco);
    }

    getById = (id: number): Promise<Endereco> => {
        return this.repository.findOne({ where: { id } });
    };

    getByUsuario = (usuarioId: number, filtros?: FindOptionsWhere<Endereco>): Promise<Endereco[]> => {
        const where = filtros ? { ...filtros, usuarioId } : {usuarioId};
        return this.repository.find({ where });
    };

    getByUsuarioAndId = (usuarioId: number, enderecoId: number): Promise<Endereco> => {
        return this.repository.findOne({ where: { id: enderecoId, usuarioId } });
    };

    insert = async (data: Partial<Endereco>): Promise<number> => {
        const result = await this.repository.insert(data);
        return result.identifiers[0].id;
    };

    update = async (id: number, data: Partial<Endereco>): Promise<boolean> => {
        const result = await this.repository.update({ id }, data);
        return result.affected === id;
    };

    delete = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete({ id });
        return result.affected === id;
    };

}
