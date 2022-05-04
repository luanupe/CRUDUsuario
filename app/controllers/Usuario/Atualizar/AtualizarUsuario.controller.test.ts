import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { UsuarioEntity } from "../../../entities/Usuario.entity";
import { AtualizarUsuarioUsecase } from '../../../usecases/Usuario/AtualizarUsuario.usecase';
import { AtualizarUsuarioController } from "./AtualizarUsuario.controller";

jest.mock('../../../usecases/Usuario/CadastrarUsuario.usecase', () => {
    return {
        CadastrarUsuarioUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const id = faker.datatype.number();

const data = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    cpf: faker.phone.phoneNumber('###########'),
    senha: faker.datatype.string(16),
    telefone: faker.phone.phoneNumber('############'),
    comunicacoes: faker.random.boolean(),
};

const useCase = new AtualizarUsuarioUsecase(null);

describe('Testando AtualizarUsuario Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve atualizar usuário com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(useCase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce({} as UsuarioEntity);

        // Arrange
        const request: Request = {
            body: data,
            usuario: { id },
        } as any as Request;

        const response = {
            status: (statusCode: number) => {
                expect(statusCode).toBe(200);
                return {
                    json: (_data: any) => {
                        expect(runSpy).toHaveBeenCalled();
                        done();
                    },
                };
            },
        } as Response;

        // Act
        const sut = new AtualizarUsuarioController(useCase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            body: data,
            usuario: { id },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(useCase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new AtualizarUsuarioController(useCase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    }, 5000);
});
