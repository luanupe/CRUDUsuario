import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { EnderecoEntity } from "../../../entities/Endereco.entity";
import { BuscarEnderecoUsecase } from "../../../usecases/Endereco/BuscarEndereco.usecase";
import { VisualizarEnderecoController } from "./VisualizarEndereco.controller";

jest.mock('../../../usecases/Endereco/BuscarEndereco.usecase', () => {
    return {
        BuscarEnderecoUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const enderecoId = faker.datatype.number();
const buscarEnderecoUsecase = new BuscarEnderecoUsecase(null);

describe('Testando VisualizarEnderecoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve buscar endereco com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(buscarEnderecoUsecase, 'run');

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
        const sut = new VisualizarEnderecoController(buscarEnderecoUsecase);
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
        const runSpy = jest.spyOn(buscarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new VisualizarEnderecoController(buscarEnderecoUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
        expect(runSpy).toHaveBeenCalled();
        expect(runSpy).toHaveBeenCalledWith(usuarioId, enderecoId);
    }, 5000);
});
