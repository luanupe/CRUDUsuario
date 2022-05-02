import { Request } from 'express';
import { faker } from "@faker-js/faker";
import { isCelebrateError } from 'celebrate';
import { Usuario } from "../../../models/Usuario.model";
import { CadastrarUsuarioValidator } from "./CadastrarUsuario.validator";

const data: Partial<Usuario> = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
    telefone: faker.phone.phoneNumber('###########'),
    comunicacoes: faker.datatype.boolean(),
    cpf: '42104277051', // CPF válido 4devs
};

describe('Testando CadastrarUsuario Validator', () => {
    it('Deve validar com sucesso', (done) => {
        // Arrange
        const request: Request = {
            body: {...data},
            method: 'post',
        } as any as Request;
        
        const next = (error) => {
            expect(isCelebrateError(error)).toBeFalsy();
            done();
        };

        // Act
        CadastrarUsuarioValidator.validate(request, null, next);
    }, 5000);
    describe('Testando body "nome"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...data};
            delete input.nome;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"nome" is required');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...data, nome: faker.datatype.string(300)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"nome" length must be less than or equal to 255 characters long');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "email"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...data};
            delete input.email;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"email" is required');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor não está num formato de e-mail', (done) => {
            // Arrange
            const input = {...data, email: faker.datatype.string()};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"email" must be a valid email');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "senha"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...data};
            delete input.senha;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"senha" is required');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "comunicacoes"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...data};
            delete input.comunicacoes;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"comunicacoes" is required');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor deve ser booleano', (done) => {
            // Arrange
            const input = {...data, comunicacoes: 'aaa'};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"comunicacoes" must be a boolean');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "telefone"', () => {
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...data, telefone: '987654321'};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"telefone" length must be at least 10 characters long');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...data, telefone: '819876543210'};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"telefone" length must be less than or equal to 11 characters long');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor deve ser string numerica', (done) => {
            // Arrange
            const input = {...data, telefone: '8198765432i'};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe(`"telefone" with value "${input.telefone}" fails to match the required pattern: /^\\d+$/`);
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "cpf"', () => {
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...data, cpf: '1234567890'};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cpf" length must be 11 characters long. "cpf" contains an invalid value');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...data, cpf: '123456789000'};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cpf" length must be 11 characters long. "cpf" contains an invalid value');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor não é válido', (done) => {
            // Arrange
            const input = {...data, cpf: faker.phone.phoneNumber('###########')};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cpf" contains an invalid value');
                done();
            };

            // Act
            CadastrarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
});