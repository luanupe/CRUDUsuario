import { DataSource } from 'typeorm';
import { Endereco } from '../models/Endereco.model';
import { Usuario } from '../models/Usuario.model';

export class Connection {

    private options: any;
    private dataSource: DataSource;

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
        console.log(JSON.stringify(this.options));
    }

    setup = async () => {
        this.dataSource = new DataSource(this.options);
        const connection = await this.dataSource.initialize();
        console.log('Database connection established');
        return connection;
    };

}
