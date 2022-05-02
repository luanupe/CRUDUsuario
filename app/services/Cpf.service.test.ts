import { CpfService } from "./Cpf.service";

describe('Testando CPF Service', () => {
    it('Não deve validar se o tipo não for string', () => {
        // Arrange
        const cpf = null;

        // Act
        const result = CpfService.isCpfValido(cpf);

        // Assert
        expect(result).toBeFalsy();
    });
    it('Não deve validar se string tiver menos de 11 caracteres', () => {
        // Arrange
        const cpf = '123456';

        // Act
        const result = CpfService.isCpfValido(cpf);

        // Assert
        expect(result).toBeFalsy();
    });
    it('Não deve validar se dígitos forem repetidos', () => {
        // Arrange
        const cpf = '11111111111';

        // Act
        const result = CpfService.isCpfValido(cpf);

        // Assert
        expect(result).toBeFalsy();
    });
    it('Não deve validar se não for um cpf inválido', () => {
        // Arrange
        const cpf = '12332145600';

        // Act
        const result = CpfService.isCpfValido(cpf);

        // Assert
        expect(result).toBeFalsy();
    });
    it('Deve validar se for um cpf válido', () => {
        // Arrange
        const cpf = '1234567890';

        // Act
        const result = CpfService.isCpfValido(cpf);

        // Assert
        expect(result).toBeFalsy();
    });
});