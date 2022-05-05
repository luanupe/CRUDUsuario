import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { EnderecoEntity } from "../../../entities/Endereco.entity";
import { ListarEnderecoUsecase } from "../../../usecases/Endereco/ListarEndereco.usecase";
import { ListarEnderecoController } from "./ListarEndereco.controller";

jest.mock('../../../usecases/Endereco/ListarEndereco.usecase', () => {
    return {
        ListarEnderecoUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const cidade = faker.address.cityName();
const listarEnderecoUsecase = new ListarEnderecoUsecase(null);

describe('Testando ListarEnderecoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve listar endereços com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(listarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce([{},{}] as EnderecoEntity[]);

        // Arrange
        const request: Request = {
            query: { cidade },
            usuario: { id: usuarioId },
        } as any as Request;

        const response = {
            status: (statusCode: number) => {
                expect(statusCode).toBe(200);
                return {
                    json: (data: any) => {
                        expect(data).toBeTruthy();
                        expect(data).toHaveLength(2);
                        expect(runSpy).toHaveBeenCalled();
                        expect(runSpy).toHaveBeenCalledWith(usuarioId, cidade);
                        done();
                    },
                };
            },
        } as Response;

        // Act
        const sut = new ListarEnderecoController(listarEnderecoUsecase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            query: { cidade },
            usuario: { id: usuarioId },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(listarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new ListarEnderecoController(listarEnderecoUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
        expect(runSpy).toHaveBeenCalled();
        expect(runSpy).toHaveBeenCalledWith(usuarioId, cidade);
    }, 5000);
});
