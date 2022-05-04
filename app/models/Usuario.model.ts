import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Endereco } from './Endereco.model';

@Entity()
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ length: 320, unique: true, nullable: false })
    email: string;

    @Column({ length: 72, nullable: false })
    senha: string;

    @Column({ length: 11, unique: true, nullable: true })
    cpf?: string;

    @Column({ length: 11, nullable: true })
    telefone?: string;

    @Column({ nullable: false })
    comunicacoes: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    criadoEm: Date;

    @Column({ nullable: true })
    atualizadoEm?: Date;

    @OneToMany(() => Endereco, endereco => endereco.usuario, { cascade: true })
    enderecos?: Endereco[];

}
