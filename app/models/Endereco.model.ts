import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario.model';

@Entity()
export class Endereco extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    logradouro: string;

    @Column({ length: 8, nullable: false })
    numero: string;

    @Column({ length: 64, nullable: false })
    bairro: string;

    @Column({ length: 64, nullable: false })
    cidade: string;

    @Column({ length: 64, nullable: false })
    estado: string;

    @Column({ length: 32, nullable: false })
    pais: string;

    @Column({ length: 8, nullable: true })
    cep: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    criadoEm: Date;

    @Column({ nullable: true })
    atualizadoEm: Date;

    @Column({ nullable: false })
    usuarioId: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuario;

}
