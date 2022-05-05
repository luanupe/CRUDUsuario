import { Request } from 'express';
import { faker } from "@faker-js/faker";
import { isCelebrateError } from 'celebrate';
import { Endereco } from '../../../models/Endereco.model';
import { CadastrarEnderecoValidator } from "./CadastrarEndereco.validator";

const enderecoMock: Partial<Endereco> = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.datatype.string(5),
};

describe('Testando CadastrarEnderecoValidator', () => {
    it('Deve validar com sucesso', (done) => {
        // Arrange
        const request: Request = {
            body: {...enderecoMock},
            method: 'post',
        } as any as Request;
        
        const next = (error) => {
            expect(isCelebrateError(error)).toBeFalsy();
            done();
        };

        // Act
        CadastrarEnderecoValidator.validate(request, null, next);
    }, 5000);
    describe('Testando body "logradouro"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...enderecoMock};
            delete input.logradouro;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"logradouro" is required');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, logradouro: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"logradouro" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "numero"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...enderecoMock};
            delete input.numero;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"numero" is required');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, numero: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"numero" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...enderecoMock, numero: faker.datatype.string(10)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"numero" length must be less than or equal to 8 characters long');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "bairro"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...enderecoMock};
            delete input.bairro;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"bairro" is required');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, bairro: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"bairro" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...enderecoMock, bairro: faker.datatype.string(65)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"bairro" length must be less than or equal to 64 characters long');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "cidade"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...enderecoMock};
            delete input.cidade;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cidade" is required');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, cidade: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cidade" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...enderecoMock, cidade: faker.datatype.string(65)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cidade" length must be less than or equal to 64 characters long');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "estado"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...enderecoMock};
            delete input.estado;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"estado" is required');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, estado: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"estado" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...enderecoMock, estado: faker.datatype.string(65)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"estado" length must be less than or equal to 64 characters long');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "pais"', () => {
        it('Deve falhar pois campo é obrigatório', (done) => {
            // Arrange
            const input = {...enderecoMock};
            delete input.pais;
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"pais" is required');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, pais: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"pais" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...enderecoMock, pais: faker.datatype.string(35)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"pais" length must be less than or equal to 32 characters long');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
    describe('Testando body "cep"', () => {
        it('Deve falhar pois valor é muito pequeno', (done) => {
            // Arrange
            const input = {...enderecoMock, cep: ''};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cep" is not allowed to be empty');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
        it('Deve falhar pois valor é muito grande', (done) => {
            // Arrange
            const input = {...enderecoMock, cep: faker.datatype.string(10)};
            
            const request: Request = {
                body: input,
                method: 'post',
            } as any as Request;
            
            const next = (error) => {
                expect(isCelebrateError(error)).toBeTruthy();
                expect(error.details.get('body').message).toBe('"cep" length must be less than or equal to 8 characters long');
                done();
            };

            // Act
            CadastrarEnderecoValidator.validate(request, null, next);
        }, 5000);
    });
});
