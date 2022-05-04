import { CookieNaoInformadoError } from "./CookieNaoInformado.error";

describe('Testando CookieNaoInformadoError Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const sut = new CookieNaoInformadoError();

        // Assert
        expect(sut).toHaveProperty('message', `Token de autorização não informado.`);
        expect(sut).toHaveProperty('statusCode', 401);
    });
});
