import { faker } from "@faker-js/faker";
import { NaoEncontradoError } from "./NaoEncontrado.error";

describe('Testando NaoEncontrado Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const id = faker.datatype.number();
        const sut = new NaoEncontradoError(id);

        // Assert
        expect(sut).toHaveProperty('message', `Usuário '${id}' não encontrado.`);
        expect(sut).toHaveProperty('statusCode', 404);
    });
});
