import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { UsuarioEntity } from "../../../entities/Usuario.entity";
import { RemoverUsuarioUsecase } from "../../../usecases/Usuario/RemoverUsuario.usecase";
import { DeletarUsuarioController } from "./DeletarUsuario.controller";

jest.mock('../../../usecases/Usuario/RemoverUsuario.usecase', () => {
    return {
        RemoverUsuarioUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const id = faker.datatype.number();
const removerUsuarioUsecase = new RemoverUsuarioUsecase(null);

describe('Testando VisualizarUsuario Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve deletar usuário com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(removerUsuarioUsecase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce({} as UsuarioEntity);

        // Arrange
        const request: Request = {
            usuario: { id },
        } as any as Request;

        const response = {
            // Assert
            status: (statusCode: number) => {
                expect(statusCode).toBe(200);
                return {
                    json: (_data: any) => {
                        expect(runSpy).toHaveBeenCalledTimes(1);
                        expect(runSpy).toHaveBeenCalledWith(id);
                        done();
                    },
                };
            },
        } as Response;

        // Act
        const sut = new DeletarUsuarioController(removerUsuarioUsecase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            usuario: { id },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(removerUsuarioUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new DeletarUsuarioController(removerUsuarioUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(runSpy).toHaveBeenCalledTimes(1);
        expect(runSpy).toHaveBeenCalledWith(id);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    }, 5000);
});
