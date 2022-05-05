import { faker } from "@faker-js/faker";
import { NaoEncontradoError } from "./NaoEncontrado.error";

describe('Testando NaoEncontradoError', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const usuarioId = faker.datatype.number();
        const enderecoId = faker.datatype.number();
        const sut = new NaoEncontradoError(usuarioId, enderecoId);

        // Assert
        expect(sut).toHaveProperty('message', `Endereço '${enderecoId}' não encontrado para o usuario ${usuarioId}.`);
        expect(sut).toHaveProperty('statusCode', 404);
    });
});
