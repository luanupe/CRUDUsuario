import { faker } from "@faker-js/faker";
import { Request } from 'express';
import { isCelebrateError } from 'celebrate';
import { Usuario } from "../../../models/Usuario.model";
import { AutenticarUsuarioValidator } from './AutenticarUsuario.validator';

const data: Partial<Usuario> = {
    email: faker.internet.email(),
    senha: faker.internet.password(),
};

describe('Testando AutenticarUsuario Validator', () => {
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
        AutenticarUsuarioValidator.validate(request, null, next);
    }, 5000);
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
            AutenticarUsuarioValidator.validate(request, null, next);
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
            AutenticarUsuarioValidator.validate(request, null, next);
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
            AutenticarUsuarioValidator.validate(request, null, next);
        }, 5000);
    });
});
