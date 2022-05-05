import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Usuario } from "../../models/Usuario.model";
import { NaoEncontradoError } from "../../errors/Usuario/NaoEncontrado.error";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { RemoverUsuarioUsecase } from "./RemoverUsuario.usecase";

jest.mock('../../repositories/Usuario.repository', () => {
    return {
        UsuarioRepository: jest.fn().mockImplementation(() => {
            return {
                getById: jest.fn(),
                delete: jest.fn(),
            };
        }),
    };
});

const id = faker.datatype.number();
const usuarioRepository = new UsuarioRepository(null);

describe('Testando RemoverUsuarioUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve remover usuário com sucesso', async () => {
        // Spy
        const getByIdSpy = jest.spyOn(usuarioRepository, 'getById');
        const deleteSpy = jest.spyOn(usuarioRepository, 'delete');

        // Mock
        getByIdSpy.mockResolvedValueOnce({ id } as Usuario);
        deleteSpy.mockResolvedValueOnce(true);
        
        // Act
        const sut = new RemoverUsuarioUsecase(usuarioRepository);
        const result = await sut.run(id);

        // Assert
        expect(result).toBeTruthy();
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(deleteSpy).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith(id);
    }, 5000);
    it('Deve lançar NaoEncontradoError caso o id não esteja em uso', async () => {
        // Spy
        const getByIdSpy = jest.spyOn(usuarioRepository, 'getById');
        const deleteSpy = jest.spyOn(usuarioRepository, 'delete');

        // Mock
        getByIdSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new RemoverUsuarioUsecase(usuarioRepository);
        const result = sut.run(id);

        // Assert
        await expect(result).rejects.toThrow(NaoEncontradoError);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(deleteSpy).not.toHaveBeenCalled();
    }, 5000);
});
