import { faker } from "@faker-js/faker";
import { TipoInvalidoError } from "./TipoInvalido.error";

describe('Testando TipoInvalidoError Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const type = faker.random.word();
        const sut = new TipoInvalidoError(type);

        // Assert
        expect(sut).toHaveProperty('message', `Método de autenticação ${type} não autorizado.`);
        expect(sut).toHaveProperty('statusCode', 401);
    });
});
