import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Request, Response } from 'express';
import { Endereco } from "../../../models/Endereco.model";
import { EnderecoEntity } from "../../../entities/Endereco.entity";
import { CadastrarEnderecoUsecase } from "../../../usecases/Endereco/CadastrarEndereco.usecase";
import { CadastrarEnderecoController } from "./CadastrarEndereco.controller";

jest.mock('../../../usecases/Endereco/CadastrarEndereco.usecase', () => {
    return {
        CadastrarEnderecoUsecase: jest.fn().mockImplementation(() => {
            return {
                run: jest.fn(),
            };
        }),
    };
});

const enderecoMock: Partial<Endereco> = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.address.zipCode(),
};

const cadastrarEnderecoUsecase = new CadastrarEnderecoUsecase(null);

describe('Testando CadastrarEnderecoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve cadastrar endereco com sucesso', (done) => {
        // Spy
        const runSpy = jest.spyOn(cadastrarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockResolvedValueOnce(enderecoMock as EnderecoEntity);

        // Arrange
        const request: Request = {
            body: enderecoMock,
            usuario: { id: faker.datatype.number() },
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
        const sut = new CadastrarEnderecoController(cadastrarEnderecoUsecase);
        sut.handle(request, response, null);
    }, 5000);
    it('Deve chamar next ao receber um Error', async () => {
        // Arrange
        const error = new Error('Error do UseCase');

        const request: Request = {
            body: enderecoMock,
            usuario: { id: faker.datatype.number() },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const runSpy = jest.spyOn(cadastrarEnderecoUsecase, 'run');

        // Mock
        runSpy.mockRejectedValueOnce(error);

        // Act
        const sut = new CadastrarEnderecoController(cadastrarEnderecoUsecase);
        await sut.handle(request, null, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    }, 5000);
});
