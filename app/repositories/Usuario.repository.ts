import { injectable, inject } from "tsyringe";
import { Repository } from "typeorm";
import { Connection } from "../server/connection";
import { Usuario } from "../models/Usuario.model";

@injectable()
export class UsuarioRepository {

    private repository: Repository<Usuario>;

    constructor(
        @inject('Connection')
        private connection: Connection,
    ) {
        this.repository = this.connection.getDataSource().getRepository(Usuario);
    }

    getById = (id: number): Promise<Usuario> => {
        return this.repository.findOne({ where: { id } });
    };

    getByCpf = (cpf: string): Promise<Usuario> => {
        return this.repository.findOne({ where: { cpf } });
    };

    getByEmail = (email: string): Promise<Usuario> => {
        return this.repository.findOne({ where: { email } });
    };

    insert = async (data: Partial<Usuario>): Promise<number> => {
        const result = await this.repository.insert(data);
        return result.identifiers[0].id;
    };

}
