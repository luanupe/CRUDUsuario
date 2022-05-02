import { faker } from "@faker-js/faker";
import { EmailEmUsoError } from "./EmailEmUso.error";

describe('Testando EmailEmUso Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const email = faker.internet.email();
        const sut = new EmailEmUsoError(email);

        // Assert
        expect(sut).toHaveProperty('message', `E-mail '${email}' já está em uso.`);
        expect(sut).toHaveProperty('statusCode', 412);
    });
});
