import { faker } from "@faker-js/faker";
import { CredencialInvalidaError } from "./CredencialInvalida.error";

describe('Testando CredencialInvalidaError Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const email = faker.internet.email();
        const sut = new CredencialInvalidaError(email);

        // Assert
        expect(sut).toHaveProperty('message', `Não foi possível autenticar o usuário '${email}', verifique os dados e tente novamente.`);
        expect(sut).toHaveProperty('statusCode', 403);
    });
});
