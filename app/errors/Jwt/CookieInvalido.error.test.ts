import { CookieInvalidoError } from "./CookieInvalido.error";

describe('Testando CookieInvalidoError Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const sut = new CookieInvalidoError();

        // Assert
        expect(sut).toHaveProperty('message', `Cookie de autorização mal formatado.`);
        expect(sut).toHaveProperty('statusCode', 401);
    });
});
