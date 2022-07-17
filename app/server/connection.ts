import { injectable, Lifecycle, scoped } from "tsyringe";
import { DataSource } from 'typeorm';
import { Endereco } from '../models/Endereco.model';
import { Usuario } from '../models/Usuario.model';

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class Connection {

    private static DATA_SOURCE: DataSource;
    private options: any;

    constructor() {
        this.options = {
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Usuario, Endereco],
            dropSchema: process.env.DB_SCHEMA_DROP === 'true',
            synchronize: process.env.DB_SCHEMA_SYC === 'true',
            logging: false,
            extra: {
              connectionLimit: process.env.DB_CONN_POOL,
            },
        };

        console.log(this.options);
    }

    /* TODO Por algum motivo o tsyring está retornando 2 instâncias 
    diferentes pelo @inject e pelo container.resolve, tornando o dataSource
    null quando é a partir do @inject no constructor das classes */
    setup = async (): Promise<DataSource> => {
        if (!Connection.DATA_SOURCE) {
            Connection.DATA_SOURCE = new DataSource(this.options);
            await Connection.DATA_SOURCE.initialize();
            console.log(`Database connection established at ${this.options.username}@${this.options.host}:${this.options.port}`);
        }
        return Connection.DATA_SOURCE;
    };

    destroy = async () => {
        if (Connection.DATA_SOURCE) {
            await Connection.DATA_SOURCE.destroy();
            Connection.DATA_SOURCE = null;
        }
    };

    getDataSource = () => {
        return Connection.DATA_SOURCE;
    };

}
