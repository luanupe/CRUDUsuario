import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Usuario } from "../../models/Usuario.model";
import { Endereco } from "../../models/Endereco.model";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { NaoEncontradoError } from "../../errors/Usuario/NaoEncontrado.error";
import { BuscarUsuarioUsecase } from "./BuscarUsuario.usecase";

jest.mock('../../repositories/Usuario.repository', () => {
    return {
        UsuarioRepository: jest.fn().mockImplementation(() => {
            return {
                getById: jest.fn(),
            };
        }),
    };
});

jest.mock('../../repositories/Endereco.repository', () => {
    return {
        EnderecoRepository: jest.fn().mockImplementation(() => {
            return {
                getByUsuario: jest.fn(),
            };
        }),
    };
});

const id = faker.datatype.number();
const usuarioRepository = new UsuarioRepository(null);
const enderecoRepository = new EnderecoRepository(null);

describe('Testando BuscarUsuario Usecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve lançar EmailEmUsoError caso o id não esteja em uso', async () => {
        // Spy
        const getByIdSpy = jest.spyOn(usuarioRepository, 'getById');
        const getByUsuarioSpy = jest.spyOn(enderecoRepository, 'getByUsuario');

        // Mock
        getByIdSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new BuscarUsuarioUsecase(usuarioRepository, enderecoRepository);
        const result = sut.run(id);

        // Assert
        await expect(result).rejects.toThrow(NaoEncontradoError);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(getByUsuarioSpy).not.toHaveBeenCalled();
    }, 5000);
    it('Deve buscar usuário com sucesso', async () => {
        // Spy
        const getUserByIdSpy = jest.spyOn(usuarioRepository, 'getById');
        const getByUsuarioSpy = jest.spyOn(enderecoRepository, 'getByUsuario');

        // Mock
        getUserByIdSpy.mockResolvedValueOnce({ id } as Usuario);
        getByUsuarioSpy.mockResolvedValueOnce([] as Endereco[]);
        
        // Act
        const sut = new BuscarUsuarioUsecase(usuarioRepository, enderecoRepository);
        const result = await sut.run(id);

        // Assert
        expect(result).toBeTruthy();
        expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
        expect(getUserByIdSpy).toHaveBeenCalledWith(id);
        expect(getByUsuarioSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioSpy).toHaveBeenCalledWith(id);
    }, 5000);
});
