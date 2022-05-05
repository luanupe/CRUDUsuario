import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Endereco } from "../../models/Endereco.model";
import { NaoEncontradoError } from "../../errors/Endereco/NaoEncontrado.error";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { AtualizarEnderecoUsecase } from "./AtualizarEndereco.usecase";

jest.mock('../../repositories/Endereco.repository', () => {
    return {
        EnderecoRepository: jest.fn().mockImplementation(() => {
            return {
                getByUsuarioAndId: jest.fn(),
                update: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const enderecoId = faker.datatype.number();
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

describe('Testando AtualizarEnderecoUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve remover endereço com sucesso', async () => {
        // Arrange
        const endereco = {
            ...enderecoMock,
            id: enderecoId,
            reload: async () => {},
        } as Endereco;

        // Spy
        const getByUsuarioAndIdSpy = jest.spyOn(enderecoRepository, 'getByUsuarioAndId');
        const updateSpy = jest.spyOn(enderecoRepository, 'update');

        // Mock
        getByUsuarioAndIdSpy.mockResolvedValueOnce(endereco);
        updateSpy.mockResolvedValueOnce(true);
        
        // Act
        const sut = new AtualizarEnderecoUsecase(enderecoRepository);
        const result = await sut.run(usuarioId, enderecoId, enderecoMock);

        // Assert
        expect(result).toBeTruthy();
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
        expect(updateSpy).toHaveBeenCalledTimes(1);
    }, 5000);
    it('Deve lançar NaoEncontradoError caso não exista o endereço especificado', async () => {
        // Spy
        const getByUsuarioAndIdSpy = jest.spyOn(enderecoRepository, 'getByUsuarioAndId');
        const updateSpy = jest.spyOn(enderecoRepository, 'update');

        // Mock
        getByUsuarioAndIdSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new AtualizarEnderecoUsecase(enderecoRepository);
        const result = sut.run(usuarioId, enderecoId, enderecoMock);

        // Assert
        await expect(result).rejects.toThrow(NaoEncontradoError);
        expect(updateSpy).not.toHaveBeenCalled();
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
    }, 5000);
});
