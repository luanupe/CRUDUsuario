import "reflect-metadata";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { Usuario } from "../models/Usuario.model";
import { Connection } from "../server/connection";
import { UsuarioRepository } from "./Usuario.repository";

const connection = new Connection();

const data: Partial<Usuario> = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: bcrypt.hashSync(faker.internet.password()),
    cpf: faker.phone.phoneNumber('###########'),
    comunicacoes: faker.datatype.boolean(),
};

describe('Testando Usuario Repository', () => {
    beforeEach(async () => {
        if (connection) await connection.destroy();
        await connection.setup();
    });
    describe('Testando método insert', () => {
        it('Deve inserir usuário com sucesso', async () => {
            // Act
            const sut = new UsuarioRepository(connection);
            const result: number = await sut.insert(data);

            // Assert
            expect(result).toBeTruthy();
        }, 5000);
    });
    describe('Testando métodos getters', () => {
        beforeEach(async () => {
            const repository = new UsuarioRepository(connection);
            await repository.insert(data);
        });
        describe('Testando método getById', () => {
            it('Deve recuperar usuário do banco de dados com sucesso', async () => {
                // Act
                const sut = new UsuarioRepository(connection);
                const result: Usuario = await sut.getById(1);

                // Assert
                expect(result).toBeTruthy();
                expect(result).toHaveProperty('id', 1);
            }, 5000);
        });
        describe('Testando método getByCpf', () => {
            it('Deve recuperar usuário do banco de dados com sucesso', async () => {
                // Act
                const sut = new UsuarioRepository(connection);
                const result: Usuario = await sut.getByCpf(data.cpf);

                // Assert
                expect(result).toBeTruthy();
                expect(result).toHaveProperty('cpf', data.cpf);
            }, 5000);
        });
        describe('Testando método getByEmail', () => {
            it('Deve recuperar usuário do banco de dados com sucesso', async () => {
                // Act
                const sut = new UsuarioRepository(connection);
                const result: Usuario = await sut.getByEmail(data.email);

                // Assert
                expect(result).toBeTruthy();
                expect(result).toHaveProperty('email', data.email);
            }, 5000);
        });
    });
});