import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { CadastrarEnderecoUsecase } from "./CadastrarEndereco.usecase";

jest.mock('../../repositories/Endereco.repository', () => {
    return {
        EnderecoRepository: jest.fn().mockImplementation(() => {
            return {
                insert: jest.fn(),
                getById: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const id = faker.datatype.number();

const enderecoMock: Partial<Endereco> = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.address.zipCode(),
};

const enderecoRepository = new EnderecoRepository(null);

describe('Testando CadastrarEnderecoUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve cadastrar endereço com sucesso', async () => {
        // Spy
        const insertSpy = jest.spyOn(enderecoRepository, 'insert');
        const getByIdSpy = jest.spyOn(enderecoRepository, 'getById');

        // Mock
        insertSpy.mockResolvedValueOnce(id);
        getByIdSpy.mockResolvedValueOnce({ id, ...enderecoMock } as Endereco);
        
        // Act
        const sut = new CadastrarEnderecoUsecase(enderecoRepository);
        const result = await sut.run(usuarioId, enderecoMock);

        // Assert
        expect(result).toBeTruthy();
        expect(insertSpy).toHaveBeenCalledTimes(1);
        expect(insertSpy).toHaveBeenCalledWith({...enderecoMock,usuarioId});
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
    }, 5000);
});
