import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { Endereco } from "../../../models/Endereco.model";
import { EnderecoEntity } from "../../../entities/Endereco.entity";
import { AtualizarEnderecoUsecase } from "../../../usecases/Endereco/AtualizarEndereco.usecase";
import { AtualizarEnderecoController } from "./AtualizarEndereco.controller";

jest.mock('../../../usecases/Endereco/AtualizarEndereco.usecase', () => {
    return {
        AtualizarEnderecoUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const enderecoId = faker.datatype.number();
const usuarioId = faker.datatype.number();

const enderecoMock: Partial<Endereco> = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.address.zipCode(),
};

const atualizarEnderecoUsecase = new AtualizarEnderecoUsecase(null);

describe('Testando AtualizarEnderecoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve atualizar endereco com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(atualizarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce(enderecoMock as EnderecoEntity);

        // Arrange
        const request: Request = {
            body: enderecoMock,
            params: { enderecoId },
            usuario: { id: usuarioId },
        } as any as Request;

        const response = {
            status: (statusCode: number) => {
                expect(statusCode).toBe(200);
                return {
                    json: (_data: any) => {
                        expect(runSpy).toHaveBeenCalled();
                        expect(runSpy).toHaveBeenCalledWith(usuarioId, enderecoId, enderecoMock);
                        done();
                    },
                };
            },
        } as Response;

        // Act
        const sut = new AtualizarEnderecoController(atualizarEnderecoUsecase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            body: enderecoMock,
            params: { enderecoId },
            usuario: { id: usuarioId },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(atualizarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new AtualizarEnderecoController(atualizarEnderecoUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    }, 5000);
});
