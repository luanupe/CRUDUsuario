import { faker } from "@faker-js/faker";
import { Endereco } from "../models/Endereco.model";
import { EnderecoEntity } from "../entities/Endereco.entity";
import { mapEndereco, mapEnderecos } from "./Endereco.adapter";

describe('Testando EndereçoAdapter', () => {
    describe('Testando método mapEndereco', () => {
        it('Deve mapear campos com sucesso', () => {
            // Arrange
            const endereco = {
                logradouro: faker.address.streetName(),
                numero: faker.address.buildingNumber(),
                bairro: faker.address.streetAddress(),
                cidade: faker.address.cityName(),
                estado: faker.address.state(),
                pais: faker.address.country(),
                cep: faker.address.zipCode(),
            } as Endereco;

            // Act
            const result: EnderecoEntity = mapEndereco(endereco);

            // Assert
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('logradouro', result.logradouro);
            expect(result).toHaveProperty('numero', result.numero);
            expect(result).toHaveProperty('bairro', result.bairro);
            expect(result).toHaveProperty('cidade', result.cidade);
            expect(result).toHaveProperty('estado', result.estado);
            expect(result).toHaveProperty('pais', result.pais);
            expect(result).toHaveProperty('cep', result.cep);
        });
    });
    describe('Testando método mapEnderecos', () => {
        it('Deve mapear todos os registros com sucesso', () => {
            // Arrange
            const enderecos = [{} as Endereco, {} as Endereco];

            // Act
            const result: EnderecoEntity[] = mapEnderecos(enderecos);

            // Assert
            expect(result).toBeTruthy();
            expect(result).toHaveLength(2);
        });
    });
});