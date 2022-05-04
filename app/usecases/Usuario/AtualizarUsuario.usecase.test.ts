import "reflect-metadata";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { AtualizarUsuarioUsecase } from "./AtualizarUsuario.usecase";
import { UsuarioRepository } from "../../repositories/Usuario.repository";
import { Usuario } from "../../models/Usuario.model";
import { EmailEmUsoError } from "../../errors/Usuario/EmailEmUso.error";
import { CpfEmUsoError } from "../../errors/Usuario/CpfEmUso.error";
import { SenhaIgualAntigaError } from "../../errors/Usuario/SenhaIgualAntiga.error";

jest.mock('../../repositories/Usuario.repository', () => {
    return {
        UsuarioRepository: jest.fn().mockImplementation(() => {
            return {
                getById: jest.fn(),
                getByCpf: jest.fn(),
                getByEmail: jest.fn(),
                update: jest.fn(),
            };
        }),
    };
});

const repository = new UsuarioRepository(null);

const id = faker.datatype.number();

const data: Partial<Usuario> = {
    email: faker.internet.email(),
    cpf: faker.phone.phoneNumber('###########'),
    senha: faker.internet.password(),
};

describe('Testando AtualizarUsuarioUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve atualizar os dados usuário com sucesso', async () => {
        // Arrange
        const usuario = {
            ...data,
            id: id,
            senha: bcrypt.hashSync(`123${data.senha}123`),
            reload: async () => {},
        } as Usuario;

        // Spy
        const getByIdSpy = jest.spyOn(repository, 'getById');
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');
        const getUserByCpfSpy = jest.spyOn(repository, 'getByCpf');
        const updateSpy = jest.spyOn(repository, 'update');

        // Mock
        getByIdSpy.mockResolvedValueOnce(usuario);
        getUserByCpfSpy.mockResolvedValueOnce(null);
        getUserByEmailSpy.mockResolvedValueOnce(null);
        updateSpy.mockResolvedValueOnce(true);
        
        // Act
        const sut = new AtualizarUsuarioUsecase(repository);
        const result = await sut.run(id, data);

        // Assert
        expect(result).toBeTruthy();
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
        expect(getUserByCpfSpy).toHaveBeenCalledTimes(1);
        expect(getUserByCpfSpy).toHaveBeenCalledWith(data.cpf);
    }, 5000);
    it('Deve lançar EmailEmUsoError caso o email já esteja em uso', async () => {
        // Spy
        const getByIdSpy = jest.spyOn(repository, 'getById');
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');

        // Mock
        getByIdSpy.mockResolvedValueOnce({ ...data, id: id } as Usuario);
        getUserByEmailSpy.mockResolvedValueOnce({ ...data, id: id+1 } as Usuario);
        
        // Act
        const sut = new AtualizarUsuarioUsecase(repository);
        const result = sut.run(id, data);

        // Assert
        await expect(result).rejects.toThrow(EmailEmUsoError);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
    }, 5000);
    it('Deve lançar CpfEmUsoError caso o cpf já esteja em uso', async () => {
        // Spy
        const getByIdSpy = jest.spyOn(repository, 'getById');
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');
        const getUserByCpfSpy = jest.spyOn(repository, 'getByCpf');

        // Mock
        getByIdSpy.mockResolvedValueOnce({ ...data, id: id } as Usuario);
        getUserByCpfSpy.mockResolvedValueOnce({ ...data, id: id+1 } as Usuario);
        getUserByEmailSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new AtualizarUsuarioUsecase(repository);
        const result = sut.run(id, data);

        // Assert
        await expect(result).rejects.toThrow(CpfEmUsoError);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
        expect(getUserByCpfSpy).toHaveBeenCalledTimes(1);
        expect(getUserByCpfSpy).toHaveBeenCalledWith(data.cpf);
    }, 5000);
    it('Deve lançar SenhaIgualAntigaError caso a senha seja a mesma', async () => {
        // Arrange
        const usuario = {
            ...data,
            id: id,
            senha: bcrypt.hashSync(data.senha),
        } as Usuario;

        // Spy
        const getByIdSpy = jest.spyOn(repository, 'getById');
        const getUserByEmailSpy = jest.spyOn(repository, 'getByEmail');
        const getUserByCpfSpy = jest.spyOn(repository, 'getByCpf');

        // Mock
        getByIdSpy.mockResolvedValueOnce(usuario);
        getUserByCpfSpy.mockResolvedValueOnce(null);
        getUserByEmailSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new AtualizarUsuarioUsecase(repository);
        const result = sut.run(id, data);

        // Assert
        await expect(result).rejects.toThrow(SenhaIgualAntigaError);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(data.email);
        expect(getUserByCpfSpy).toHaveBeenCalledTimes(1);
        expect(getUserByCpfSpy).toHaveBeenCalledWith(data.cpf);
    }, 5000);
});
