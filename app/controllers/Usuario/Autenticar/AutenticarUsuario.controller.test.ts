import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { AutenticarUsuarioUsecase } from "../../../usecases/Usuario/AutenticarUsuario.usecase";
import { AutenticarUsuarioController } from "./AutenticarUsuario.controller";
import { LoginEntity } from "../../../entities/Login.entity";

jest.mock('../../../usecases/Usuario/CadastrarUsuario.usecase', () => {
    return {
        CadastrarUsuarioUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const data = {
    email: faker.internet.email(),
    senha: faker.internet.password(),
};
const autenticarUsuarioUsecase = new AutenticarUsuarioUsecase(null, null);

describe('Testando AutenticarUsuario Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve cadastrar usuário com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(autenticarUsuarioUsecase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce({} as LoginEntity);

        // Arrange
        const request: Request = {
            body: data,
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
        const sut = new AutenticarUsuarioController(autenticarUsuarioUsecase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            body: data,
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(autenticarUsuarioUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new AutenticarUsuarioController(autenticarUsuarioUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    }, 5000);
});
