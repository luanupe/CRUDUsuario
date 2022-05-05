import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { CadastrarEnderecoUsecase } from "./CadastrarEndereco.usecase";
import { BuscarEnderecoUsecase } from "./BuscarEndereco.usecase";
import { NaoEncontradoError } from "../../errors/Endereco/NaoEncontrado.error";

jest.mock('../../repositories/Endereco.repository', () => {
    return {
        EnderecoRepository: jest.fn().mockImplementation(() => {
            return {
                getByUsuarioAndId: jest.fn(),
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

describe('Testando BuscarEnderecoUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve buscar endereço com sucesso', async () => {
        // Spy
        const getByUsuarioAndIdSpy = jest.spyOn(enderecoRepository, 'getByUsuarioAndId');

        // Mock
        getByUsuarioAndIdSpy.mockResolvedValueOnce({} as Endereco);
        
        // Act
        const sut = new BuscarEnderecoUsecase(enderecoRepository);
        const result = await sut.run(usuarioId, enderecoId);

        // Assert
        expect(result).toBeTruthy();
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
    }, 5000);
    it('Deve lançar NaoEncontradoError caso não exista o endereço especificado', async () => {
        // Spy
        const getByUsuarioAndIdSpy = jest.spyOn(enderecoRepository, 'getByUsuarioAndId');

        // Mock
        getByUsuarioAndIdSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new BuscarEnderecoUsecase(enderecoRepository);
        const result = sut.run(usuarioId, enderecoId);

        // Assert
        await expect(result).rejects.toThrow(NaoEncontradoError);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
    }, 5000);
});
