import "reflect-metadata";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { CadastrarUsuarioUsecase } from "./CadastrarUsuario.usecase";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { Usuario } from "../../models/Usuario.model";

jest.mock('../../repositories/Usuario.repository', () => {
    return {
        UsuarioRepository: jest.fn().mockImplementation(() => {
            return {
                getById: jest.fn(),
                getByCpf: jest.fn(),
                getByEmail: jest.fn(),
                insert: jest.fn(),
            };
        }),
    };
});

const data: Partial<Usuario> = {
    email: faker.internet.email(),
    cpf: faker.phone.phoneNumber('###########'),
    senha: bcrypt.hashSync(faker.internet.password()),
};
const repository = new UsuarioRepository(null);

describe('Testando CadastrarUsuario Usecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve lançar EmailEmUsoError caso o email já esteja em uso', async () => {
        // Spy
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');

        // Mock
        getUserByEmailSpy.mockResolvedValueOnce({} as Usuario);
        
        // Act
        const sut = new CadastrarUsuarioUsecase(repository);
        const result = sut.run(data);

        // Assert
        await expect(result).rejects.toThrow();
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
    }, 5000);
    it('Deve lançar EmailEmUsoError caso o cpf já esteja em uso', async () => {
        // Spy
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');
        const getUserByCpfSpy = jest.spyOn(repository, 'getByCpf');

        // Mock
        getUserByEmailSpy.mockResolvedValueOnce(null);
        getUserByCpfSpy.mockResolvedValueOnce({} as Usuario);
        
        // Act
        const sut = new CadastrarUsuarioUsecase(repository);
        const result = sut.run(data);

        // Assert
        await expect(result).rejects.toThrow();
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByCpfSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
        expect(getUserByCpfSpy).toHaveBeenCalledWith(data.cpf);
    }, 5000);
    it('Deve criar usuário com sucesso', async () => {
        // Arrange
        const id = 1;

        // Spy
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');
        const getUserByCpfSpy = jest.spyOn(repository, 'getByCpf');
        const getUserByIdSpy = jest.spyOn(repository, 'getById');
        const insertSpy = jest.spyOn(repository, 'insert');

        // Mock
        getUserByEmailSpy.mockResolvedValueOnce(null);
        getUserByCpfSpy.mockResolvedValueOnce(null);
        getUserByIdSpy.mockResolvedValueOnce({} as Usuario);
        insertSpy.mockResolvedValueOnce(id);
        
        // Act
        const sut = new CadastrarUsuarioUsecase(repository);
        const result = await sut.run(data);

        // Assert
        expect(result).toBeTruthy();
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByCpfSpy).toHaveBeenCalledTimes(1);
        expect(insertSpy).toHaveBeenCalledTimes(1);
        expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
        expect(getUserByCpfSpy).toHaveBeenCalledWith(data.cpf);
        expect(insertSpy).toHaveBeenCalledWith(data);
        expect(getUserByIdSpy).toHaveBeenCalledWith(id);
    }, 5000);
});
