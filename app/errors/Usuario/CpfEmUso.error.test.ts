import { CpfEmUsoError } from "./CpfEmUso.error";

describe('Testando CpfEmUso Error', () => {
    it('Deve construir o objeto de erro com sucesso', () => {
        // Arrange
        const cpf = '1234567890';
        const sut = new CpfEmUsoError(cpf);

        // Assert
        expect(sut).toHaveProperty('message', `CPF '${cpf}' já está em uso.`);
        expect(sut).toHaveProperty('statusCode', 412);
    });
});
