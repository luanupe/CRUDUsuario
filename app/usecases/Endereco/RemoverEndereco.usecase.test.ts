import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { RemoverEnderecoUsecase } from "./RemoverEndereco.usecase";
import { NaoEncontradoError } from "../../errors/Endereco/NaoEncontrado.error";

jest.mock('../../repositories/Endereco.repository', () => {
    return {
        EnderecoRepository: jest.fn().mockImplementation(() => {
            return {
                getByUsuarioAndId: jest.fn(),
                delete: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const enderecoId = faker.datatype.number();
const enderecoRepository = new EnderecoRepository(null);

describe('Testando RemoverEnderecoUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve remover endereço com sucesso', async () => {
        // Spy
        const getByUsuarioAndIdSpy = jest.spyOn(enderecoRepository, 'getByUsuarioAndId');
        const deleteSpy = jest.spyOn(enderecoRepository, 'delete');

        // Mock
        getByUsuarioAndIdSpy.mockResolvedValueOnce({ id: enderecoId } as Endereco);
        deleteSpy.mockResolvedValueOnce(true);
        
        // Act
        const sut = new RemoverEnderecoUsecase(enderecoRepository);
        const result = await sut.run(usuarioId, enderecoId);

        // Assert
        expect(result).toBeTruthy();
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
        expect(deleteSpy).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith(enderecoId);
    }, 5000);
    it('Deve lançar NaoEncontradoError caso não exista o endereço especificado', async () => {
        // Spy
        const getByUsuarioAndIdSpy = jest.spyOn(enderecoRepository, 'getByUsuarioAndId');
        const deleteSpy = jest.spyOn(enderecoRepository, 'delete');

        // Mock
        getByUsuarioAndIdSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new RemoverEnderecoUsecase(enderecoRepository);
        const result = sut.run(usuarioId, enderecoId);

        // Assert
        await expect(result).rejects.toThrow(NaoEncontradoError);
        expect(deleteSpy).not.toHaveBeenCalled();
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioAndIdSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
    }, 5000);
});
