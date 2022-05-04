import { faker } from "@faker-js/faker";
import { SenhaIgualAntigaError } from "./SenhaIgualAntiga.error";

describe('Testando SenhaIgualAntigaError', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const id = faker.datatype.number();
        const sut = new SenhaIgualAntigaError();

        // Assert
        expect(sut).toHaveProperty('message', 'A nova senha não pode ser igual a antiga.');
        expect(sut).toHaveProperty('statusCode', 409);
    });
});
