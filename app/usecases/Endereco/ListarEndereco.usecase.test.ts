import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { Endereco } from "../../models/Endereco.model";
import { EnderecoRepository } from "../../repositories/Endereco.repository";
import { ListarEnderecoUsecase } from "./ListarEndereco.usecase";

jest.mock('../../repositories/Endereco.repository', () => {
    return {
        EnderecoRepository: jest.fn().mockImplementation(() => {
            return {
                getByUsuario: jest.fn(),
            };
        }),
    };
});

const usuarioId = faker.datatype.number();
const cidade = faker.address.cityName();
const enderecoRepository = new EnderecoRepository(null);

describe('Testando ListarEnderecoUsecase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve buscar endereço com sucesso', async () => {
        // Spy
        const getByUsuarioSpy = jest.spyOn(enderecoRepository, 'getByUsuario');

        // Mock
        getByUsuarioSpy.mockResolvedValueOnce([{},{}] as Endereco[]);
        
        // Act
        const sut = new ListarEnderecoUsecase(enderecoRepository);
        const result = await sut.run(usuarioId, cidade);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toHaveLength(2);
        expect(getByUsuarioSpy).toHaveBeenCalledTimes(1);
        expect(getByUsuarioSpy).toHaveBeenCalledWith(usuarioId, { cidade });
    }, 5000);
});
