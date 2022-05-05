import "reflect-metadata";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { Usuario } from "../models/Usuario.model";
import { Endereco } from "../models/Endereco.model";
import { Connection } from "../server/connection";
import { UsuarioRepository } from "./Usuario.repository";
import { EnderecoRepository } from "./Endereco.repository";

const connection = new Connection();
let usuarioId;
let enderecoId;

const dataUsuario: Partial<Usuario> = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: bcrypt.hashSync(faker.internet.password()),
    cpf: faker.phone.phoneNumber('###########'),
    comunicacoes: faker.datatype.boolean(),
};

const dataEndereco: Partial<Endereco> = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.address.zipCode(),
};

describe('Testando Endereco Repository', () => {
    beforeEach(async () => {
        await connection.setup();
        const repository = new UsuarioRepository(connection);
        usuarioId = await repository.insert(dataUsuario);
    });
    afterEach(async () => {
        await connection.destroy();
    });
    describe('Testando método insert', () => {
        it('Deve inserir endereço com sucesso', async () => {
            // Act
            const sut = new EnderecoRepository(connection);
            const result: number = await sut.insert({ ...dataEndereco, usuarioId });

            // Assert
            expect(result).toBeTruthy();
        }, 5000);
    });
    describe('Testando métodos getters', () => {
        beforeEach(async () => {
            const sut = new EnderecoRepository(connection);
            enderecoId = await sut.insert({ ...dataEndereco, usuarioId });
        });
        describe('Testando método getById', () => {
            it('Deve recuperar endereço do banco de dados com sucesso', async () => {
                // Arrange
                const id = 1;

                // Act
                const sut = new EnderecoRepository(connection);
                const result: Endereco = await sut.getById(id);

                // Assert
                expect(result).toBeTruthy();
                expect(result).toHaveProperty('id', id);
            }, 5000);
        });
        describe('Testando método getByUsuario', () => {
            it('Deve recuperar endereço do banco de dados com sucesso', async () => {
                // Act
                const sut = new EnderecoRepository(connection);
                const result: Endereco[] = await sut.getByUsuario(usuarioId);

                // Assert
                expect(result).toBeTruthy();
                expect(result).toHaveLength(1);
                expect(result[0]).toHaveProperty('usuarioId', usuarioId);
            }, 5000);
        });
        describe('Testando método getByUsuarioAndId', () => {
            it('Deve recuperar endereço do banco de dados com sucesso', async () => {
                // Act
                const sut = new EnderecoRepository(connection);
                const result: Endereco = await sut.getByUsuarioAndId(usuarioId, enderecoId);

                // Assert
                expect(result).toBeTruthy();
                expect(result).toHaveProperty('id', enderecoId);
                expect(result).toHaveProperty('usuarioId', usuarioId);
            }, 5000);
        });
        describe('Testando método update', () => {
            it('Deve atualizar endereço do banco de dados com sucesso', async () => {
                // Arrange
                const sut = new EnderecoRepository(connection);
                const endereco: Endereco = (await sut.getByUsuario(usuarioId))[0];

                const dataEnderecoUpdate: Partial<Endereco> = {
                    logradouro: faker.address.streetName(),
                    numero: faker.address.buildingNumber(),
                    bairro: faker.address.streetAddress(),
                    cidade: faker.address.cityName(),
                    estado: faker.address.state(),
                    pais: faker.address.country(),
                    cep: faker.address.zipCode(),
                };

                // Act
                const resultUpdate: boolean = await sut.update(endereco.id, dataEnderecoUpdate);
                const result: Endereco = await sut.getById(endereco.id);

                // Assert
                expect(resultUpdate).toBeTruthy();
                expect(result).toHaveProperty('logradouro', dataEnderecoUpdate.logradouro);
                expect(result).toHaveProperty('numero', dataEnderecoUpdate.numero);
                expect(result).toHaveProperty('bairro', dataEnderecoUpdate.bairro);
                expect(result).toHaveProperty('cidade', dataEnderecoUpdate.cidade);
                expect(result).toHaveProperty('estado', dataEnderecoUpdate.estado);
                expect(result).toHaveProperty('pais', dataEnderecoUpdate.pais);
                expect(result).toHaveProperty('cep', dataEnderecoUpdate.cep);
            }, 5000);
        });
        describe('Testando método delete', () => {
            it('Deve deletar endereço do banco de dados com sucesso', async () => {
                // Arrange
                const sut = new EnderecoRepository(connection);
                const endereco: Endereco = (await sut.getByUsuario(usuarioId))[0];

                // Act
                const resultUpdate: boolean = await sut.delete(endereco.id,);
                const result: Endereco = await sut.getById(endereco.id);

                // Assert
                expect(resultUpdate).toBeTruthy();
                expect(result).toBeFalsy();
            }, 5000);
        });
    });
});
