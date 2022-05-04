import "reflect-metadata";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { JwtService } from "../../services/Jwt.service";
import { CredencialInvalidaError } from "../../errors/Usuario/CredencialInvalida.error";
import { AutenticarUsuarioUsecase } from "./AutenticarUsuario.usecase";
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


jest.mock('../../services/Jwt.service', () => {
    return {
        JwtService: jest.fn().mockImplementation(() => {
            return {
                assinar: jest.fn(),
                validar: jest.fn(),
            };
        }),
    };
});

const email = faker.internet.email();
const senha = faker.internet.password();

const usuarioRepository = new UsuarioRepository(null);
const jwtService = new JwtService();

describe('Testando AutenticarUsuario Usecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve lançar CredencialInvalidaError caso o email não esteja em uso', async () => {
        // Spy
        const getUserByEmailSpy = jest.spyOn(usuarioRepository, 'getByEmail');

        // Mock
        getUserByEmailSpy.mockResolvedValueOnce(null);
        
        // Act
        const sut = new AutenticarUsuarioUsecase(usuarioRepository, jwtService);
        const result = sut.run(email, senha);

        // Assert
        await expect(result).rejects.toThrow(CredencialInvalidaError);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(email);
    }, 5000);
    it('Deve lançar CredencialInvalidaError caso a senha seja inválida', async () => {
        // Spy
        const getUserByEmailSpy = jest.spyOn(usuarioRepository, 'getByEmail');

        // Mock
        getUserByEmailSpy.mockResolvedValueOnce({ senha: bcrypt.hashSync(`${senha}123`) } as Usuario);
        
        // Act
        const sut = new AutenticarUsuarioUsecase(usuarioRepository, jwtService);
        const result = sut.run(email, senha);

        // Assert
        await expect(result).rejects.toThrow(CredencialInvalidaError);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(email);
    }, 5000);
    it('Deve autenticar usuário com sucesso', async () => {
        // Arrange
        const id = faker.datatype.number();

        // Spy
        const getUserByEmailSpy = jest.spyOn(usuarioRepository, 'getByEmail');

        // Mock
        getUserByEmailSpy.mockResolvedValueOnce({ id, email, senha: bcrypt.hashSync(senha) } as Usuario);
        
        // Act
        const sut = new AutenticarUsuarioUsecase(usuarioRepository, jwtService);
        const result = await sut.run(email, senha);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toHaveProperty('bearer');
        expect(result).toHaveProperty('usuario');
        expect(result.usuario).toHaveProperty('id', id);
        expect(result.usuario).toHaveProperty('email', email);
        expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
        expect(getUserByEmailSpy).toHaveBeenCalledWith(email);
    }, 5000);
});
