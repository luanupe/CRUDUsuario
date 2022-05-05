import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { EnderecoEntity } from "../../../entities/Endereco.entity";
import { RemoverEnderecoUsecase } from "../../../usecases/Endereco/RemoverEndereco.usecase";
import { DeletarEnderecoController } from "./DeletarEndereco.controller";

jest.mock('../../../usecases/Endereco/RemoverEndereco.usecase', () => {
    return {
        RemoverEnderecoUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const enderecoId = faker.datatype.number();
const removerEnderecoUsecase = new RemoverEnderecoUsecase(null);

describe('Testando DeletarEnderecoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve buscar endereco com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(removerEnderecoUsecase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce({} as EnderecoEntity);

        // Arrange
        const request: Request = {
            params: { enderecoId },
            usuario: { id: usuarioId },
        } as any as Request;

        const response = {
            status: (statusCode: number) => {
                expect(statusCode).toBe(200);
                return {
                    json: (_data: any) => {
                        expect(runSpy).toHaveBeenCalled();
                        expect(runSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
                        done();
                    },
                };
            },
        } as Response;

        // Act
        const sut = new DeletarEnderecoController(removerEnderecoUsecase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            params: { enderecoId },
            usuario: { id: usuarioId },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(removerEnderecoUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new DeletarEnderecoController(removerEnderecoUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
        expect(runSpy).toHaveBeenCalled();
        expect(runSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
    }, 5000);
});
